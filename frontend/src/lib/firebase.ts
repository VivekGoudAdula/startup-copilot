import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "") {
  try {
    const existingApps = getApps();
    if (existingApps.length === 0) {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = initializeFirestore(app, {
        localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
      });
    } else {
      app = existingApps[0];
      auth = getAuth(app);
      db = getFirestore(app);
    }
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    // Fallback to basic firestore if initialization fails or was already done
    if (app && !db) {
      try {
        db = getFirestore(app);
      } catch (e) {
        console.error("Critical: Could not even initialize fallback Firestore", e);
      }
    }
  }
}
else {
  console.warn("Firebase API Key is missing. Authentication features will be disabled. Please configure Firebase environment variables.");
}

export { auth, db };
