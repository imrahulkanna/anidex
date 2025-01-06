import Navbar from "@/components/User/Navbar";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="mt-20">
            <Navbar />
            {children}
        </div>
    );
};

export default UserLayout;
