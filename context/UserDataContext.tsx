"use client";
import { useSession } from "next-auth/react";
import React, { useState, useContext, createContext, ReactNode, useEffect } from "react";

interface UserDataContextType {
    userData: any;
    setUserData: (data: any) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
    const { data: session } = useSession();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!session || !session?.user) {
            setUserData(null);
            console.log("user is not logged in");
            return;
        }

        const fetchUserDetails = async () => {
            try {
                const requestBody = {
                    userId: session?.user?._id,
                };
                const response = await fetch("/api/get-user-details", {
                    method: "POST",
                    cache: "no-cache",
                    body: JSON.stringify(requestBody),
                });
                const userData = await response.json();
                console.log("data", userData);
                setUserData(userData.data);
            } catch (error) {
                console.log("Error fetching user details", (error as Error).message);
            }
        };

        fetchUserDetails();
    }, [session?.user]);

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
};
