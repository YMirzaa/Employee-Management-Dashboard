"use server";

import { ZodError } from "zod";
import { loginSchema } from "../schemas/authenticationSchema";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
type Fields = {
	username: string;
	password: string;
};

export type FormState = {
	message: string | null;
	data: any;
	errors: Record<keyof Fields, string> | undefined;
};

export async function loginUserAction(
	previousState: FormState,
	formData: FormData
): Promise<FormState> {
	try {
		const validationData = loginSchema.safeParse({
			username: formData.get("username"),
			password: formData.get("password"),
		});
		if (!validationData.success) {
			const zodError = validationData.error as ZodError;
			const errorMap = zodError.flatten().fieldErrors;
			return {
				message: `Error`,
				errors: {
					username: errorMap["username"]?.[0] ?? "",
					password: errorMap["password"]?.[0] ?? "",
				},
				data: undefined,
			};
		}
		const response = await fetch(`${process.env.BASE_URL}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(validationData.data),
			cache: "no-cache",
		});

		const responseData = await response.json();

		if (responseData.accessToken && response.ok) {
			const {
				exp: expirationDate,
				sub: _subject,
			}: {
				exp: number;
				sub: string;
			} = jwtDecode(responseData.accessToken);

			cookies().set({
				name: "access-token",
				value: `Bearer ${responseData.accessToken}`,
				secure: true,
				expires: expirationDate * 1000,
				sameSite: "strict",
			});
		} else {
			throw new Error("Login failed");
		}
	} catch (error: any) {
		// console.log("Error: ", error);
		console.log(error);

		return {
			message: error.message,
			errors: undefined,
			data: undefined,
		};
	}

	redirect("/dashboard");
}

