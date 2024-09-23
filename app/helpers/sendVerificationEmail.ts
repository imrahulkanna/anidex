import { resend } from "../lib/resend";
import VerificationEmail from "@/components/emailsTemplate/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Anidex <onboarding@resend.dev>',
            to: [email],
            subject: 'Anidex - Verify account',
            react: VerificationEmail({ username, otp: verifyCode }),
        });
        return {success: true, message: "Verification email sent successfully"}
    } catch (emailError) {
        console.log("Error while sending verification email", emailError);
        return {success: false, message: "Failed to send verification email"}
    }
}
