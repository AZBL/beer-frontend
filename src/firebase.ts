import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { API_BASE_URL } from "./config";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

export const auth = getAuth();

export const signUp = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const token = await user.getIdToken();

  try {
    await axios.post(`${API_BASE_URL}/auth/register`, {
      token: token,
      first_name: firstName,
      last_name: lastName,
    });
  } catch (error: any) {
    throw new Error(error.response.data.error || "Could not sign up");
  }
};

// Sign Out
export const signOutFromFirebase = async () => {
  return await auth.signOut();
};

// Sign In
export const signIn = async (email: string, password: string) => {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

// get first name
export const fetchUserProfile = async (uid: string) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const token = await user.getIdToken();

  const response = await fetch(
    `${API_BASE_URL}/auth/getUserProfile?uid=${uid}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not fetch user profile");
  }

  return data;
};

// subscribing to auth changes
onAuthStateChanged(auth, (user) => {
  console.log("user status changed:", user);
});

export const getFirebaseToken = async (): Promise<string | null> => {
  try {
    const token = await auth.currentUser?.getIdToken();
    return token ?? null;
  } catch (error) {
    console.error("Error fetching the token:", error);
    return null;
  }
};
