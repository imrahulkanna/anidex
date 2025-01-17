import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/model/User";
import FavouritesModel from "@/model/Favourites";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text " },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [{ email: credentials.email }, { username: credentials.username }],
                    });

                    if (!user) {
                        throw new Error("EmailNotFound");
                    }

                    if (!user.isVerified) {
                        throw new Error("NotVerified");
                    }

                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error("PasswordIncorrect");
                    }
                } catch (error: any) {
                    console.log("Failed to connect db", error);
                    throw new Error(error);
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            await dbConnect();

            if (account?.provider) {
                const userData = await UserModel.findOne({
                    email: user.email,
                });

                if (userData) {
                    user._id = userData._id as string;
                    user.name = userData.name;
                    user.isVerified = userData.isVerified || true;
                    user.username = userData.username;

                    if (!userData.isVerified) {
                        await UserModel.updateOne({ _id: userData._id }, { isVerified: true });
                    }

                    if (!userData.image) {
                        await UserModel.updateOne({ _id: userData._id }, { image: user.image });
                    } else {
                        user.image = userData.image;
                    }
                } else {
                    //TODO: If no matching user is found, create a new user in db
                    return false;
                }
            }

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.username = token.username;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "components/Login",
    },
};
