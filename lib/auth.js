import React, { useState, useEffect, useContext, createContext } from 'react'

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
} from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import initializeAuth from './firebase'
import axios from 'axios'

initializeAuth()

const auth = getAuth()

const provider = new GoogleAuthProvider()

const authContext = createContext()

export function AuthProvider({ children }) {
  const authContent = useProvideAuth()
  return (
    <authContext.Provider value={authContent}>{children}</authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState()

  const [loginStatus, setLoginStatus] = useState({
    status: 'idle',
    error: null,
  })

  const formatUser = (user) => ({
    email: user.email,
    emailVerified: user.emailVerified,
    name: user.displayName,
    provider: user.providerData?.[0].providerId,
    photoUrl: user.photoURL,
    uid: user.uid,
  })

  //sign in user with google
  const signInWithGoogle = async () => {
    setLoginStatus({ status: 'pending', error: null })

    try {
      const response = await signInWithPopup(auth, provider)

      let formattedUser = []

      const dbUser = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${response.user.email}`,
      )
      if (!dbUser.data) {
        formattedUser = formatUser(response.user)

        const user = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/`,
          formattedUser,
        )
        setUser(user.data)
        setLoginStatus({ status: 'resolved', error: null })
        return user.data
      } else {
        setUser(dbUser.data)
        setLoginStatus({ status: 'resolved', error: null })

        return dbUser.data
      }
    } catch (err) {
      setUser(null)
      setLoginStatus({ status: 'resolved', error: err.message })
    }
  }

  const signInWithGoogleRedirect = async () => {
    try {
      await signInWithRedirect(auth, provider)
      const res = getRedirectResult(auth)
      return res.user
    } catch (err) {
      console.log(err)
    }
  }

  // login user with email and password
  const signInWithEmailAndPass = async (email, password) => {
    setLoginStatus({ status: 'pending', error: null })
    const api = process.env.NEXT_PUBLIC_API_BASE_URL
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      // Signed in
      const res = await axios.get(`${api}/users/${response.user.email}`)

      if (res.data.emailVerified != response.user.emailVerified) {
        //if user recently verified his email
        const formattedUser = formatUser(response.user)
        try {
          const updatedData = await axios.patch(
            `${process.env.API_BASE_URL}/users/${res.data._id}`,
            formattedUser,
          )
          setUser(updatedData.data)
        } catch (err) {
          console.log(err)
        }
      } else {
        setUser(res.data)
      }
      setLoginStatus({ status: 'resolved', error: null })
      return user
    } catch (err) {
      setUser(null)
      setLoginStatus({ status: 'resolved', error: err.message })
    }
  }

  //update user name
  const updateUserName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: 'https://example.com/jane-q-user/profile.jpg',
    })
      .then(() => {
        // Update successful.
        console.log('User name updated successfully')
      })
      .catch(() => {
        // An error happened.
        console.log("User name dosen't updated successfully")
      })
  }

  const sendEmailVerificationMail = (user) => {
    sendEmailVerification(user).then(() => {
      console.log(`Email verification send to ${auth.currentUser.email}`)
    })
  }

  //Create user with email and password
  const signUpWithEmailAndPass = async (name, email, password) => {
    setLoginStatus({ status: 'pending', error: null })
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )

      updateUserName(name)
      const formattedUser = formatUser(response.user)

      axios
        .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, formattedUser)
        .then((res) => {
          if (res) {
            setUser(res.data)
            setLoginStatus({ status: 'resolved', error: null })
            sendEmailVerificationMail(response.user)
          }
        })
      setLoginStatus({ status: 'resolved', error: null })
      return formattedUser
    } catch (err) {
      setUser(null)
      setLoginStatus({ status: 'resolved', error: err.message })
    }
  }

  const resetPass = (email) => {
    return sendPasswordResetEmail(auth, email)
      .then((res) => {
        return { success: 'Reset email sent' }
      })
      .catch((error) => {
        return { error: 'Email is not registered' }
      })
  }

  const logOut = () => {
    return signOut(auth).then(() => {
      setUser(null)

      setLoginStatus({ status: 'idle', error: null })
    })
  }
  const loadFunction = async () => {
    setLoginStatus({ status: 'pending', error: null })
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user.email}`,
        )
        if (user.emailVerified != userData?.data?.emailVerified) {
          const formattedUser = formatUser(user)
          const api = process.env.NEXT_PUBLIC_API_BASE_URL
          try {
            userData?.data._id
            const updatedData = await axios.patch(
              `${api}/users/${userData?.data?._id}`,
              formattedUser,
            )
            setUser(updatedData.data)
            setLoginStatus({ status: 'resolved', error: null })
          } catch (err) {
            console.log(err)
          }
        } else {
          setUser(userData.data)
          setLoginStatus({ status: 'resolved', error: null })
        }
      } else {
        setLoginStatus({ status: 'idle', error: null })
        setUser(false)
      }
    })

    return () => unsubscribe()
  }
  useEffect(() => {
    loadFunction()
  }, [])

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
  }
}
