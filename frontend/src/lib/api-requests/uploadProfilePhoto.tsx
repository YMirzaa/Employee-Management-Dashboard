"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function uploadProfilePhoto({ id, formData }: any): Promise<any> {
	const accessToken = cookies().get("access-token")!.value;
	const response = await fetch(
		`${process.env.BASE_URL}/employee/${id}/photo`,
		{
			cache: "no-cache",
			method: "POST",
			body: formData,
			headers: {
				Authorization: accessToken,
			},
		}
	);
	// console.log(response);
	const path = `/user/${id}`;
	revalidatePath(path, "page");
	// const responseData = await response.json();
	return "success";
}

