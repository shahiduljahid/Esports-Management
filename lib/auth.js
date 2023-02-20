import React, { useState, useEffect, useContext, createContext } from "react";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  onAuthStateChanged,
  sendPasswordResetEmail,
  getRedirectResult,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import initializeAuth from "./firebase";
import axios from "axios";
import { useSnackbar } from "notistack";

initializeAuth();

const auth = getAuth();

const provider = new GoogleAuthProvider();

const authContext = createContext();

export function AuthProvider({ children }) {
  const authContent = useProvideAuth();
  return (
    <authContext.Provider value={authContent}>{children}</authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState();

  const [loginStatus, setLoginStatus] = useState({
    status: "idle",
    error: null,
  });
  const { enqueueSnackbar } = useSnackbar();
  const notificationPopUp = (message, variant) => {
    enqueueSnackbar(message.toUpperCase(), {
      variant: variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  };
  const formatUser = (user) => ({
    email: user.email,
    emailVerified: user.emailVerified,
    name: user.displayName,
    provider: user.providerData?.[0].providerId,
    photoUrl: user.photoURL,
    uid: user.uid,
  });

  //sign in user with google
  const signInWithGoogle = async () => {
    setLoginStatus({ status: "pending", error: null });

    try {
      const response = await signInWithPopup(auth, provider);

      let formattedUser = [];

      const dbUser = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${response.user.email}`
      );
      if (!dbUser.data) {
        formattedUser = formatUser(response.user);

        const user = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/`,
          formattedUser
        );
        notificationPopUp(
          "congratulation you created account successfully",
          "success"
        );
        setUser(user.data);
        setLoginStatus({ status: "resolved", error: null });

        return user.data;
      } else {
        notificationPopUp("log in done successfully", "success");
        setUser(dbUser.data);
        setLoginStatus({ status: "resolved", error: null });

        return dbUser.data;
      }
    } catch (err) {
      notificationPopUp("log in failed . try again", "error");
      setUser(null);
      setLoginStatus({ status: "resolved", error: err.message });
    }
  };

  const signInWithGoogleRedirect = async () => {
    try {
      await signInWithRedirect(auth, provider);
      const res = getRedirectResult(auth);
      return res.user;
    } catch (err) {
      console.log(err);
    }
  };

  // login user with email and password
  const signInWithEmailAndPass = async (email, password) => {
    setLoginStatus({ status: "pending", error: null });
    const api = process.env.NEXT_PUBLIC_API_BASE_URL;
    try {
      // Signed in
      const res = await axios.post(`${api}/users/getUser`, { email, password });
      if (res.data) {
        notificationPopUp("log in done successfully", "success");
        setUser(res.data);
        setLoginStatus({ status: "resolved", error: null });
        return user;
      } else {
        notificationPopUp("log in failed! user not found", "error");
      }
    } catch (err) {
      notificationPopUp("log in failed! user not found", "error");
      setUser(null);
      setLoginStatus({ status: "resolved", error: err.message });
    }
  };

  //update user name
  const updateUserName = async (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
      .then(() => {
        // Update successful.
        console.log("User name updated successfully");
      })
      .catch(() => {
        // An error happened.
        console.log("User name dosen't updated successfully");
      });
  };

  const sendEmailVerificationMail = (user) => {
    sendEmailVerification(user).then(() => {
      console.log(`Email verification send to ${auth.currentUser.email}`);
    });
  };

  //Create user with email and password
  const signUpWithEmailAndPass = async (name, email, password) => {
    setLoginStatus({ status: "pending", error: null });
    try {
      const formattedUser = {
        email: email,
        emailVerified: true,
        name: name,
        provider: "password",
        photoUrl: "https://example.com/jane-q-user/profile.jpg",
        password: password,
        uid: "",
      };

      axios
        .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, formattedUser)
        .then((res) => {
          if (res) {
            notificationPopUp("Account created successfully", "success");
            setUser(res.data);
            setLoginStatus({ status: "resolved", error: null });
          }
        });
      setLoginStatus({ status: "resolved", error: null });
      return formattedUser;
    } catch (err) {
      notificationPopUp("email already used to create account", "error");
      setUser(null);
      setLoginStatus({ status: "resolved", error: err.message });
    }
  };

  const resetPass = (email) => {
    return sendPasswordResetEmail(auth, email)
      .then((res) => {
        return { success: "Reset email sent" };
      })
      .catch((error) => {
        return { error: "Email is not registered" };
      });
  };

  const logOut = () => {
    setUser(null);
    setLoginStatus({ status: "idle", error: null });
  };
  const loadFunction = async () => {
    setLoginStatus({ status: "pending", error: null });
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user.email}`
        );

          setUser(userData.data);
          setLoginStatus({ status: "resolved", error: null });
        
      } else {
        setLoginStatus({ status: "idle", error: null });
        setUser(false);
      }
    });

    return () => unsubscribe();
  };
  useEffect(() => {
    loadFunction();
  }, []);

  return {
    auth,
    user,
    setUser,
    loginStatus,
    signInWithGoogle,
    signInWithGoogleRedirect,
    signUpWithEmailAndPass,
    signInWithEmailAndPass,
    resetPass,
    logOut,
  };
}
