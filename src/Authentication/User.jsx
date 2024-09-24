import { 
  createUserWithEmailAndPassword, 
  fetchSignInMethodsForEmail, 
  onAuthStateChanged, 
  updateProfile, 
  signOut, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig.jsx";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
      console.log("Auth state changed, user is: ", currentUser);
    });

    return () => unsubscribe();
  }, []);

  const UserSignup = async ({ email, password, username }) => {

    const userExistsMethods = await fetchSignInMethodsForEmail(auth, email);

    if (userExistsMethods.length > 0) return false;

    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      await updateProfile(user, { displayName: username });

      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        displayName: username,
      });

      return true;

    } catch (error) {
      console.log("UserSignup Error: ", error.message);
    }
  };

  const userLogin = async ({ email, password }) => {
    try {
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return !!userCredential;

    } catch (error) {
      console.log("UserLogin Error: ", error.message);
    }
  };

  const Logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, userLogin, UserSignup, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};
