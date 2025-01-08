"use client";
import InputBox from "@/components/InputBox";
import { useUserData } from "@/context/UserDataContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { PencilIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";

const Profile = () => {
    const { userData } = useUserData();

    const initFormData = {
        email: "",
        fullName: "",
        username: "",
        image: "",
    };
    const [formData, setFormData] = useState(initFormData);

    useEffect(() => {
        const updatedFormData = {
            email: userData?.email || "",
            fullName: userData?.name || "",
            username: userData?.username || "",
            image: userData?.image || "",
        };
        setFormData(updatedFormData);
    }, [userData]);

    const handleInputChange = (name: string, value: string) => {
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);
    };

    return (
        <div
            id="profile-container"
            className="p-4 md:px-10 mx-auto w-full md:w-[500px] flex flex-col items-center"
        >
            <div className="mb-6 relative" id="profile-image-container">
                <Image
                    src={formData?.image || "/loadUserProfile.jpg"}
                    alt="profile-image"
                    width={150}
                    height={150}
                    className="rounded-full"
                />
                <div className="absolute bottom-3 right-3 bg-neutral-100 p-1.5 rounded-full cursor-pointer">
                    <PencilIcon className="w-3 stroke-black fill-black" />
                </div>
            </div>
            <div className="mx-auto w-3/4 md:w-[400px] flex flex-col gap-6 mb-6 items-end h-auto">
                <div className="w-full">
                    <label>
                        Email
                        <InputBox
                            type="text"
                            placeholder="Email"
                            name="email"
                            inputValue={formData.email}
                            readOnly={true}
                        />
                    </label>
                    {userData?.isVerified && (
                        <div className="w-full mt-1 text-sm text-green-500 flex items-center justify-end gap-1">
                            <CheckBadgeIcon className="w-4" />
                            Verified
                        </div>
                    )}
                </div>
                <label className="w-full">
                    Name
                    <InputBox
                        type="text"
                        placeholder="Full Name"
                        name="fullName"
                        inputValue={formData.fullName}
                        onInputChange={handleInputChange}
                    />
                </label>
                <label className="w-full">
                    Username
                    <InputBox
                        type="text"
                        placeholder="Username"
                        name="username"
                        inputValue={formData.username}
                        onInputChange={handleInputChange}
                    />
                </label>
            </div>
        </div>
    );
};

export default Profile;
