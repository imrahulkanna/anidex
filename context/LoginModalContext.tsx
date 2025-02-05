"use client";
import React, { useState, useContext, createContext, ReactNode } from "react";

interface LoginModalContextType {
    openLoginModal: boolean;
    setOpenLoginModal: (state: boolean) => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined);

export const LoginModalProvider = ({ children }: { children: ReactNode }) => {
    const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

    return (
        <LoginModalContext.Provider value={{ openLoginModal, setOpenLoginModal }}>
            {children}
        </LoginModalContext.Provider>
    );
};

export const useLoginModal = (): LoginModalContextType => {
    const context = useContext(LoginModalContext);
    if (!context) {
        throw new Error("useLoginModal must be used within a LoginModalProvider");
    }
    return context;
};
