import React from "react";
import { Card, CardContent } from "./ui/card";

const HoverCard: React.FC<{ setIsHover: React.Dispatch<React.SetStateAction<boolean>> }> = ({
    setIsHover,
}) => {
    return (
        <div >
            <Card>
                <CardContent>HoverCard</CardContent>
            </Card>
        </div>
    );
};

export default HoverCard;
