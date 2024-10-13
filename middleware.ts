import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//     const token = await getToken({req: request});

//     if (token) {
//         return NextResponse.redirect(new URL("/", request.url));
//     }
//     return NextResponse.redirect(new URL("/", request.url));
// }
export const config = {
    matcher: '/sign-in',
}