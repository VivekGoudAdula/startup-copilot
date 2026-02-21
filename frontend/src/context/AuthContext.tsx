import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, collection, query, orderBy, limit } from 'firebase/firestore';
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
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  projects: [],
  loading: true,
  refreshProfile: async () => { }
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async (uid: string) => {
    if (!db) return;

    // Subscribe to profile
    const profileRef = doc(db, 'users', uid);
    const profileSnap = await getDoc(profileRef);

    if (!profileSnap.exists()) {
      const defaultProfile = { onboardingComplete: false };
      await setDoc(profileRef, defaultProfile);
      setProfile(defaultProfile);
    } else {
      setProfile(profileSnap.data() as UserProfile);
    }

    // Subscribe to projects
    const projectsRef = collection(db, 'users', uid, 'projects');
    const q = query(projectsRef, orderBy('lastUpdated', 'desc'));

    const unsubscribeProjects = onSnapshot(q, (snapshot) => {
      const projectsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ProjectData[];
      setProjects(projectsList);
    });

    return unsubscribeProjects;
  };

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    let unsubscribeProjects: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        unsubscribeProjects = await fetchProfileData(currentUser.uid);
      } else {
        setProfile(null);
        setProjects([]);
      }
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProjects) unsubscribeProjects();
    };
  }, []);

  const refreshProfile = async () => {
    if (user && db) {
      const profileRef = doc(db, 'users', user.uid);
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        setProfile(profileSnap.data() as UserProfile);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, projects, loading, refreshProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
