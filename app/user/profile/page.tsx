"use client";
import InputBox from "@/components/InputBox";
import { useUserData } from "@/context/UserDataContext";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { PencilIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useLoading } from "@/context/LoadingContext";

const Profile = () => {
    const { userData, setUserData } = useUserData();
    const { setLoading } = useLoading();

    const initFormData = {
        email: "",
        fullName: "",
        username: "",
        image: "",
    };
    const [formData, setFormData] = useState(initFormData);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

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

    const openFileUploadDialog = () => {
        if (fileInputRef && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageUpload = async (e: React.FormEvent<HTMLInputElement>) => {
        const files = (e.target as HTMLInputElement).files;

        if (files && files.length > 0) {
            setLoading(true);
            const imgFormData = new FormData();
            imgFormData.append("image", files[0]);
            imgFormData.append("id", userData._id);

            const res = await fetch("/api/upload", {
                method: "POST",
                cache: "no-cache",
                body: imgFormData,
            });

            const data = await res.json();
            if (data.success) {
                setUserData((prevState: object) => {
                    return { ...prevState, image: data.path };
                });
                setFormData({ ...formData, image: data.path });
            } else {
                console.log("something went wrong");
            }
            setLoading(false);
        }
    };

    return (
        <div
            id="profile-container"
            className="p-4 md:px-10 mx-auto w-full md:w-[500px] flex flex-col items-center"
        >
            <div
                className="mb-6 relative cursor-pointer"
                id="profile-image-container"
                onClick={openFileUploadDialog}
            >
                <input
                    type="file"
                    name="profileImgUploader"
                    id="profileImgUploader"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    ref={fileInputRef}
                />
                <Image
                    src={formData?.image || "/loadUserProfile.jpg"}
                    alt="profile-image"
                    width={150}
                    height={150}
                    className="rounded-full h-[150px] object-cover"
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
