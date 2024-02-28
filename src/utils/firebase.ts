import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { authDomain, firebaseApiKey, projectID, storageBucket } from ".";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: authDomain,
  projectId: projectID,
  storageBucket: storageBucket,
};

const app = initializeApp(firebaseConfig);

// Initialize Cloud Functions through Firebase
const functions = getFunctions(app);

// Initialize Firestore through Firebase
export const db = getFirestore(app);

// Initialize Authentication through Firebase
export const auth = getAuth(app);
