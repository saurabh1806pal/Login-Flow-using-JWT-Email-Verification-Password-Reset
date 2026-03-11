import axios from 'axios';
import {  useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AppContext } from './Context';

export const AppContextProvider = ({ children }) => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const getAuthState = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/auth/is-auth`, {
                withCredentials: true,
            });
            if (data.success){
                setIsLoggedIn(true);
                await getUserData();
            }
        } catch (error) {
            console.error("Auth check failed:", error);
        }finally {
            setAuthLoading(false);
        }
    };


    const getUserData = async () => {
        try {
            const {data} = await axios.get(`${API_URL}/api/user/profile`, {
                withCredentials: true,
            });
            data.success ? setUserData(data.user) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getAuthState();
    }, []);
  const contextValue = {
    // You can add any global state or functions here
    API_URL, isLoggedIn, setIsLoggedIn, userData, setUserData, getUserData, authLoading
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};