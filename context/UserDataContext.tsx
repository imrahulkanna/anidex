"use client";
import React, { useState, useContext, createContext, ReactNode } from "react";

interface UserDataContextType {
    userData: any;
    setUserData: (data: any) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState();

    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserData = (): UserDataContextType => {
    const context = useContext(UserDataContext);
    if (!context) {
        throw new Error("useUserData must be used within a UserDataProvider");
    }
    return context;
}
