import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.resolve("", "public/uploads");

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const file = formData.get("image") as File | null;

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No file uploaded" },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR, { recursive: true });
        }

        const filePath = path.resolve(UPLOAD_DIR, file.name);
        fs.writeFileSync(filePath, new Uint8Array(buffer));

        return NextResponse.json({
            success: true,
            path: `/uploads/${file.name}`,
        });
    } catch (error) {
        console.error("File upload failed:", error);
        return NextResponse.json(
            { success: false, message: "File upload failed" },
            { status: 500 }
        );
    }
};
