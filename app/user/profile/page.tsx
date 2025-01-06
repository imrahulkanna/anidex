"use client";
import InputBox from "@/components/InputBox";
import { useUserData } from "@/context/UserDataContext";
import Image from "next/image";
import React from "react";
import { PencilIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";

const Profile = () => {
    const { userData } = useUserData();
    return (
        <div
            id="profile-container"
            className="p-4 md:px-10 mx-auto w-full md:w-[500px] flex flex-col items-center"
        >
            <div className="mb-6 relative" id="profile-image-container">
                <Image
                    src={userData?.image}
                    alt="profile-image"
                    width={150}
                    height={150}
                    className="rounded-full"
                />
                <div className="absolute bottom-3 right-3 bg-neutral-100 p-1.5 rounded-full cursor-pointer">
                    <PencilIcon className="w-3 stroke-black fill-black" />
                </div>
            </div>
            <div className="mx-auto md:w-[400px] flex flex-col gap-6 mb-6 items-end h-auto">
                <div className="w-full">
                    <InputBox type="text" placeholder="Email" name="email" readOnly={true} />
                    {userData?.isVerified && (
                        <div className="w-full mt-1 text-sm text-green-500 flex items-center justify-end gap-1">
                            <CheckBadgeIcon className="w-4" />
                            Verified
                        </div>
                    )}
                </div>
                <InputBox type="text" placeholder="Full Name" name="fullName" />
                <InputBox type="text" placeholder="Username" name="username" />
            </div>
        </div>
    );
};

export default Profile;
