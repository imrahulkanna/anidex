import { Chicle } from "next/font/google";
import React, { ReactNode } from "react";

interface props {
    children: ReactNode;
}
export const Skeleton = ({ children }: props) => {
    return <div className="animate-pulse">{children}</div>;
};
