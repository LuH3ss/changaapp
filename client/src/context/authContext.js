import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if(!context) throw new Error('asd')
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginGoogle = () => {
    const googleLogin = new GoogleAuthProvider()
    return signInWithPopup(auth, googleLogin )
  }

  const loginFacebook = () => {
    const facebookLogin = new FacebookAuthProvider()
    return signInWithPopup(auth, facebookLogin)
  }

  const signUp = (email,password) => {
    return createUserWithEmailAndPassword(auth,email,password)
  }

  const logout = () => signOut(auth);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log({ currentUser });
      setUser(currentUser);
    });
  }, []);

  return (
    <authContext.Provider value={{ user, login, logout, signUp, loginGoogle, loginFacebook }}>
      {children}
    </authContext.Provider>
  );
}
