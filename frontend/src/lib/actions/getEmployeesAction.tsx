"use server";

import { cookies } from "next/headers";

export async function getEmployeesAction(
	name: string | undefined,
	page: string | undefined,
	size: number = 10,
	search: string = "",
	sort: string = "fullname",
	order: string = "asc"
) {
	// Get token from the cookie and decide
	const accessToken = cookies().get("access-token")!.value;

	const response = await fetch(
		`${process.env.BASE_URL}/employee${page ? `?page=${page}` : ""}${
			name ? `&name=${name}` : ""
		}`,
		{
			cache: "no-cache",
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: accessToken,
			},
		}
	);

	const responseData = await response.json();
	return responseData;
}

