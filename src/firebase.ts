import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app: FirebaseApp = initializeApp(firebaseConfig);
// initializeApp(firebaseConfig);

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

  const response = await fetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      first_name: firstName,
      last_name: lastName,
    }),
  });

  // Log the raw response text before trying to parse as JSON
  const responseText = await response.text();
  console.log("Raw Response:", responseText);

  // Since you've already read the response once, you'll need to convert the text to a JSON object manually
  let data;
  try {
    data = JSON.parse(responseText);
  } catch (e) {
    throw new Error("Failed to parse response as JSON");
  }

  if (!response.ok) {
    throw new Error(data.error || "Could not sign up");
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

  const response = await fetch(`/auth/getUserProfile?uid=${uid}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

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
