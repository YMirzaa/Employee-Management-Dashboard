"use server";

import { cookies } from "next/headers";

export async function getProfilePhoto({ id }: { id: string }): Promise<any> {
	// const accessToken = cookies().get("access-token")!.value;
	// const response = await fetch(
	// 	`${process.env.BASE_URL}/employee/${id}/photo`,
	// 	{
	// 		cache: "no-cache",
	// 		method: "GET",
	// 		headers: {
	// 			Authorization: accessToken,
	// 		},
	// 	}
	// );
	// const responseData = await response.json();
	return `${process.env.BASE_URL}/employee/${id}/photo`;
}

