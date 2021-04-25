import React, { createContext, useContext, useEffect, useState } from 'react';
import fireBaseAuth from '../firebase';

interface AuthContextInterface {
    signup: (email: string, password: string) => any;
    signin: (email: string, password: string) => any;
    signout: () => void;
    userData: any;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);


const useAuthContextValue = (): AuthContextInterface => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true)

    const signupManually = (email: string, password: string) => {
        return fireBaseAuth.auth().createUserWithEmailAndPassword(email, password);
    }
    useEffect(() => {
        const subscription = fireBaseAuth.auth().onAuthStateChanged(user => {
            setUserData(user);
            setLoading(false);
        });
        return subscription;
    }, [setUserData]);

    return {
        signup: signupManually,
        userData,
        isAuthenticated: !!userData,
        loading,
        signout: () => {
            fireBaseAuth.auth().signOut();
        },
        signin: (email: string, password: string) => {
            return fireBaseAuth.auth().signInWithEmailAndPassword(email, password);
        }
    }
};

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within the AuthContext.Provider');
    }
    return context;
}

const AuthProvider = ({ children }) => {
    const auth = useAuthContextValue();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuthContext };