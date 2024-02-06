"use server";

import { Employee } from "@/components/tables/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createEmployeeAction(
	previousState: any,
	formData: FormData
): Promise<any> {
	const accessToken = cookies().get("access-token")!.value;
	console.log(new Date(formData.get("birthDate") as string));
	const employee: Employee = {
		email: formData.get("email") as string,
		name: formData.get("name") as string,
		lastName: formData.get("lastname") as string,
		phoneNumber: formData.get("phoneNumber") as string,
		carPlate: formData.get("carPlate") as string,
		tcNo: formData.get("tcNo") as string,
		address: formData.get("address") as string,
		emergencyContactName: formData.get("emergencyContactName") as string,
		emergencyContactPhoneNumber: formData.get(
			"emergencyContactPhoneNumber"
		) as string,
		gender: formData.get("gender") as string,
		bloodType: formData.get("bloodType") as string,
		fullName: "test",
		birthDate: formData.get("birthDate") as any,
		corporateProfileDto: {
			recordNumber: formData.get("recordNumber") as string,
			personnelCadre: formData.get("personnelCadre") as string,
			title: formData.get("title") as string,
			unit: formData.get("unit") as string,
			assignment: formData.get("assignment") as string,
			workType: formData.get("workType") as string,
			internalNumber: formData.get("internalNumber") as string,
			roomNumber: formData.get("roomNumber") as string,
			enterenceDate: formData.get("enterenceDate") as any,
		},
	};
	console.log(employee);
	const response = await fetch(`${process.env.BASE_URL}/employee`, {
		cache: "no-cache",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: accessToken,
		},
		body: JSON.stringify(employee),
	});

	const responseData = await response.json();
	console.log(responseData);
	revalidatePath("/dashboard");
	// return responseData;
	return {
		message: "Employee created successfully",
		type: "SUCCESS",
	};
}

