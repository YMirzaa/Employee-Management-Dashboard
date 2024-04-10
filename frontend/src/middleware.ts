import { DEFAULT_LOGIN_REDIRECT_URL, authRoutes, publicRoutes } from "@/routes";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const { nextUrl } = request;

	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	const accessToken = request.cookies.get("access-token");

	if (isAuthRoute) {
		if (accessToken) {
			return Response.redirect(
				new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl)
			);
		}
		return NextResponse.next();
	}
	if (!accessToken && !isPublicRoute) {
		return Response.redirect(new URL("/login", nextUrl));
	}
	if (!accessToken && nextUrl.pathname === "/") {
		return Response.redirect(new URL("/login", nextUrl));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

