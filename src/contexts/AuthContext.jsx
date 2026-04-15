import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch user data from firestore to determine role
        let role = 'admin'; // Default fallback or check specific collections
        let data = null;

        // Try students
        const qStudents = query(collection(db, 'students'), where('email', '==', user.email));
        const qsStudents = await getDocs(qStudents);
        if (!qsStudents.empty) {
          role = 'siswa';
          data = qsStudents.docs[0].data();
        } else {
          // Try teachers
          const qTeachers = query(collection(db, 'teachers'), where('email', '==', user.email));
          const qsTeachers = await getDocs(qTeachers);
          if (!qsTeachers.empty) {
            role = 'guru';
            data = qsTeachers.docs[0].data();
          } else {
             // Assume admin if not in students or teachers
             role = 'admin';
             // You could have an admins collection
          }
        }
        setUserData({ role, ...data });
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
