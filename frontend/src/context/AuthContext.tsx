import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export interface ProjectData {
  id: string;
  name: string;
  idea: string;
  audience: string;
  competitors?: string;
  validationScore: number;
  executionConfidence: number;
  lastUpdated: number;
}

export interface UserProfile {
  onboardingComplete: boolean;
  lastActiveProjectId?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  projects: ProjectData[];
  loading: boolean;
  refreshProfile: () => Promise<void>;
  servicesReady: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  projects: [],
  loading: true,
  refreshProfile: async () => { },
  servicesReady: false
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = (uid: string) => {
    if (!db) return;

    // Use onSnapshot for profile to get cached data immediately
    const profileRef = doc(db, 'users', uid);
    const unsubscribeProfile = onSnapshot(profileRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data() as UserProfile);
      } else {
        const defaultProfile = { onboardingComplete: false };
        setDoc(profileRef, defaultProfile).catch(err => {
          console.error("Error creating default profile:", err);
        });
        setProfile(defaultProfile);
      }
    }, (error) => {
      console.error("Profile subscription error:", error);
    });

    // Subscribe to projects
    const projectsRef = collection(db, 'users', uid, 'projects');
    const q = query(projectsRef, orderBy('lastUpdated', 'desc'));

    const unsubscribeProjects = onSnapshot(q, (snapshot) => {
      const projectsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ProjectData[];
      setProjects(projectsList);
    }, (error) => {
      console.error("Projects subscription error:", error);
    });

    return () => {
      unsubscribeProfile();
      unsubscribeProjects();
    };
  };

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    let unsubscribeProfileData: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        unsubscribeProfileData = fetchProfileData(currentUser.uid);
      } else {
        setProfile(null);
        setProjects([]);
        if (unsubscribeProfileData) {
          unsubscribeProfileData();
          unsubscribeProfileData = undefined;
        }
      }
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfileData) unsubscribeProfileData();
    };
  }, []);

  const refreshProfile = async () => {
    // With onSnapshot, refreshProfile is mostly redundant for data updates
    // but we can keep a placeholder or re-trigger if needed
  };

  const servicesReady = !!(auth && db);

  return (
    <AuthContext.Provider value={{ user, profile, projects, loading, refreshProfile, servicesReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
