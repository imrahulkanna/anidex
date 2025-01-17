import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Storage } from "@google-cloud/storage";
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/model/User";

export const POST = async (req: NextRequest) => {
    await dbConnect();

    try {
        const formData = await req.formData();
        const uploadedFile = formData.get("image") as File | null;
        const userId = formData.get("id");

        if (!uploadedFile) {
            return NextResponse.json(
                { success: false, message: "No file uploaded" },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await uploadedFile.arrayBuffer());
        const contentType = uploadedFile.type || "application/octet-stream";

        const storage = new Storage({
            projectId: "anidex-432019",
            keyFilename: path.resolve(process.cwd(), "anidex-432019-6b774e7d1f36.json"),
        });

        const profileImgBucket = storage.bucket("anidex-profile-images");
        const newFile = profileImgBucket.file(uploadedFile.name);

        await newFile.save(buffer, {
            metadata: {
                contentType,
            },
        });

        const publicUrl = `https://storage.googleapis.com/anidex-profile-images/${uploadedFile.name}`;

        await UserModel.updateOne({ _id: userId }, { image: publicUrl });

        return NextResponse.json({
            success: true,
            path: publicUrl,
        });
    } catch (error) {
        console.error("File upload failed:", error);
        return NextResponse.json(
            { success: false, message: `File upload failed: ${error}` },
            { status: 500 }
        );
    }
};
