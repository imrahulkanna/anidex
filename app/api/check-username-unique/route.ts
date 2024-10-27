import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const usernameQuery = searchParams.get("username")
        const result = usernameValidation.safeParse(usernameQuery);

        if (!result.success) {
            const usernameErrors = result.error?.format()._errors || [];
            return Response.json(
                {
                    success: false,
                    message:
                        usernameErrors?.length > 0
                            ? usernameErrors.join(",")
                            : "Invalid username format",
                },
                {
                    status: 400,
                }
            );
        }

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username: usernameQuery,
            isVerified: true,
        });

        if (existingUserVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "Username already taken"
                },
                {
                    status: 400
                }
            )
        }

        return Response.json(
            {
                success: true,
                message: "Username available!"
            },
            {
                status: 200
            }
        );
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Error while parsing username"
            },
            {
                status: 500,
            }
        );
    }
}
