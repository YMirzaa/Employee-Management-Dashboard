"use server";

import { cookies } from "next/headers";

export async function getUserAction(): Promise<any> {
	const accessToken = cookies().get("access-token")!.value;

	const response = await fetch(`${process.env.BASE_URL}/employee/user`, {
		cache: "force-cache",
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: accessToken,
		},
	});

	const responseData = await response.json();
	return responseData;
}

