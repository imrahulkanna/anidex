import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/model/User";
import { sendVerificationEmail } from "@/app/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { email, username } = await request.json();
        const existingUserByEmail = await UserModel.findOne({
            email,
        });

        if (!existingUserByEmail) {
            return Response.json(
                {
                    success: false,
                    message: "No user exists with this email",
                },
                { status: 400 }
            );
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = expiryDate;
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);

        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message,
                },
                { status: 500 }
            );
        } else {
            await existingUserByEmail.save(); 
            return Response.json(
                {
                    success: true,
                    message: "Code sent successfully.",
                },
                { status: 200 }
            );
        }
    } catch (error) {
        console.log("Error while resending verification code", error);
        return Response.json(
            {
                success: false,
                message: "Error while resending verification code",
            },
            { status: 500 }
        );
    }
}
