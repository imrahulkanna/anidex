import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { email, enteredCode } = await request.json();
        const userDetails = await UserModel.findOne({ email });

        if (userDetails && userDetails.verifyCode == enteredCode) {
            userDetails.isVerified = true;
            await userDetails.save();

            return Response.json(
                {
                    success: true,
                    message: "Email verified successfully",
                },
                { status: 200 }
            );
        } else {;
            return Response.json(
                {
                    success: false,
                    message: "Incorrect verification code. Try again",
                },
                { status: 400 }
            );
        }
        return Response.json({});
    } catch (error) {}
}
