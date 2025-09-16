import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  getDocs,
  collection,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, googleProvider, facebookProvider } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, get additional user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.exists() ? userDoc.data() : {};
          
          const userInfo = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || userData.name || 'User',
            avatar: firebaseUser.photoURL || userData.avatar,
            role: userData.role || 'user', // Default to 'user' if no role is set
            provider: firebaseUser.providerData[0]?.providerId || 'email',
            emailVerified: firebaseUser.emailVerified,
            createdAt: userData.createdAt || new Date().toISOString()
          };
          
          setUser(userInfo);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Still set basic user info even if Firestore fails
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || 'User',
            avatar: firebaseUser.photoURL,
            role: 'user',
            provider: firebaseUser.providerData[0]?.providerId || 'email',
            emailVerified: firebaseUser.emailVerified
          });
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Create user document in Firestore
  const createUserDocument = async (firebaseUser, additionalData = {}) => {
    if (!firebaseUser) return;
    
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      const { displayName, email, photoURL } = firebaseUser;
      const createdAt = serverTimestamp();
      
      try {
        await setDoc(userRef, {
          name: displayName || additionalData.name || 'User',
          email,
          avatar: photoURL || additionalData.avatar,
          role: additionalData.role || 'user',
          createdAt,
          lastLogin: serverTimestamp(),
          ...additionalData
        });
      } catch (error) {
        console.error('Error creating user document:', error);
      }
    } else {
      // Update last login
      try {
        await setDoc(userRef, {
          lastLogin: serverTimestamp()
        }, { merge: true });
      } catch (error) {
        console.error('Error updating last login:', error);
      }
    }
  };

  // Email/Password Signup
  const signupWithEmail = async (email, password, name, role = 'user') => {
    try {
      setLoading(true);
      
      // Create user account
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      await updateProfile(firebaseUser, {
        displayName: name
      });
      
      // Create user document in Firestore
      await createUserDocument(firebaseUser, { name, role });
      
      return { success: true, user: firebaseUser };
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        error: getFirebaseErrorMessage(error.code) 
      };
    } finally {
      setLoading(false);
    }
  };

  // Email/Password Login
  const loginWithEmail = async (email, password) => {
    try {
      setLoading(true);
      
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      
      // Update user document with last login
      await createUserDocument(firebaseUser);
      
      return { success: true, user: firebaseUser };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: getFirebaseErrorMessage(error.code) 
      };
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth Login
  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      // Determine role based on email or make first user admin
      let role = 'user';
      
      // Check if this is the first user (admin)
      try {
        const usersQuery = await getDocs(collection(db, 'users'));
        if (usersQuery.empty) {
          role = 'admin'; // First user becomes admin
        } else if (firebaseUser.email?.includes('admin')) {
          role = 'admin'; // Email-based admin assignment
        }
      } catch (error) {
        console.error('Error checking user count:', error);
        // Fallback to email-based role assignment
        role = firebaseUser.email?.includes('admin') ? 'admin' : 'user';
      }
      
      // Create or update user document
      await createUserDocument(firebaseUser, { role });
      
      return { success: true, user: firebaseUser };
    } catch (error) {
      console.error('Google login error:', error);
      return { 
        success: false, 
        error: getFirebaseErrorMessage(error.code) 
      };
    } finally {
      setLoading(false);
    }
  };

  // Facebook OAuth Login
  const loginWithFacebook = async () => {
    try {
      setLoading(true);
      
      const result = await signInWithPopup(auth, facebookProvider);
      const firebaseUser = result.user;
      
      // Determine role based on email or set default
      const role = firebaseUser.email?.includes('admin') ? 'admin' : 'user';
      
      // Create or update user document
      await createUserDocument(firebaseUser, { role });
      
      return { success: true, user: firebaseUser };
    } catch (error) {
      console.error('Facebook login error:', error);
      return { 
        success: false, 
        error: getFirebaseErrorMessage(error.code) 
      };
    } finally {
      setLoading(false);
    }
  };

  // LinkedIn OAuth (Custom implementation)
  const loginWithLinkedIn = async () => {
    try {
      setLoading(true);
      
      // LinkedIn OAuth implementation using popup window
      const linkedInClientId = process.env.REACT_APP_LINKEDIN_CLIENT_ID || 'demo-client-id';
      const redirectUri = encodeURIComponent(`${window.location.origin}/linkedin-callback`);
      const state = Math.random().toString(36).substring(2, 15);
      const scope = encodeURIComponent('r_liteprofile r_emailaddress');
      
      const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedInClientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
      
      // Open LinkedIn OAuth in popup
      const popup = window.open(
        linkedInAuthUrl,
        'linkedin-login',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      );
      
      if (!popup) {
        throw new Error('Popup was blocked. Please allow popups for this site.');
      }
      
      // For now, return a message that LinkedIn requires additional setup
      await new Promise(resolve => setTimeout(resolve, 500));
      popup.close();
      
      return { 
        success: false, 
        error: 'LinkedIn sign-in is coming soon! Please use Google, Facebook, or email to continue.' 
      };
    } catch (error) {
      console.error('LinkedIn login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  // Update user role (Admin function)
  const updateUserRole = async (userId, newRole) => {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, { 
        role: newRole,
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      // If updating current user, refresh user data
      if (userId === user?.uid) {
        const updatedDoc = await getDoc(userRef);
        const updatedData = updatedDoc.data();
        setUser(prev => ({ ...prev, role: updatedData.role }));
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error updating user role:', error);
      return { success: false, error: error.message };
    }
  };

  // Utility functions
  const hasRole = (role) => {
    return user && user.role === role;
  };

  const isAdmin = () => {
    return hasRole('admin');
  };

  const isAuthenticated = () => {
    return !!user;
  };

  // Firebase error message handler
  const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No user found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/popup-closed-by-user':
        return 'Login popup was closed. Please try again.';
      case 'auth/cancelled-popup-request':
        return 'Login request was cancelled.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  const value = {
    user,
    loading,
    loginWithEmail,
    signupWithEmail,
    loginWithGoogle,
    loginWithFacebook,
    loginWithLinkedIn,
    logout,
    updateUserRole,
    hasRole,
    isAdmin,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};