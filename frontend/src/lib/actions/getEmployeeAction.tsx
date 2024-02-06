"use server";

import { cookies } from "next/headers";

export async function getEmployeeAction(id: string) {
	// Get token from the cookie and decide
	const accessToken = cookies().get("access-token")!.value;

	const response = await fetch(`${process.env.BASE_URL}/employee/${id}`, {
		// next:{

		// },

		cache: "no-cache",
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: accessToken,
		},
	});

	const responseData = await response.json();
	return responseData;
}

