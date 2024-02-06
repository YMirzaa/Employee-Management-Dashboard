"use client";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { updateEmployeeProfileAction } from "@/lib/actions/updateEmployeeProfileAction";
import { Avatar, Select, SelectItem } from "@nextui-org/react";

export default function EmployeeForm({ user }: any) {
	const [formState, formAction] = useFormState(updateEmployeeProfileAction, {
		message: null,
		errors: undefined,
	});
	const { pending } = useFormStatus();
	const [newUser, setNewUser] = useState(user);

	return (
		<form action={formAction} className='bg-white p-2 rounded-lg'>
			<div className='flex justify-between px-2'>
				<h1 className='text-lg font-bold'>Kisisel</h1>

				<Avatar
					src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
					alt='User'
					size='sm'
				/>
			</div>
			<div className='grid grid-cols-2 gap-2 py-2'>
				<Input
					name='name'
					defaultValue={user.name}
					variant='bordered'
					value={newUser.name}
					onValueChange={(value) =>
						setNewUser({ ...newUser, name: value })
					}
					type='text'
					label='Ad'
					size='sm'
				/>
				<Input
					name='lastname'
					variant='bordered'
					type='text'
					label='Soyad'
					size='sm'
					value={newUser.lastName}
					onValueChange={(value) =>
						setNewUser({ ...newUser, lastName: value })
					}
				/>
				<Input
					name='tcNo'
					variant='bordered'
					type='text'
					label='TC Kimlik Numarası'
					size='sm'
					value={newUser.tcNo}
					onValueChange={(value) =>
						setNewUser({ ...newUser, tcNo: value })
					}
				/>

				<Select
					label='Cinsiyet'
					size='sm'
					variant='bordered'
					defaultSelectedKeys={[newUser.gender]}
					onSelectionChange={(value) =>
						setNewUser({ ...newUser, gender: value })
					}
				>
					<SelectItem key={"MALE"} value={"MALE"}>
						Erkek
					</SelectItem>

					<SelectItem key={"FEMALE"} value={"FEMALE"}>
						Kadin
					</SelectItem>
				</Select>

				<Input
					name='email'
					variant='bordered'
					type='text'
					label='E-Posta'
					size='sm'
					value={newUser.email}
					onValueChange={(value) =>
						setNewUser({ ...newUser, email: value })
					}
				/>
				<Input
					name='birthDate'
					variant='bordered'
					type='date'
					label='Dogum Tarihi'
					size='sm'
					// defaultValue='2012-06-04'
					value={
						new Date(newUser.birthDate.toString())
							.toISOString()
							.split("T")[0]
					}
					onValueChange={(value) =>
						setNewUser({ ...newUser, birthDate: value })
					}
				/>
				<Select
					name='bloodType'
					label='Kan grubu'
					size='sm'
					variant='bordered'
					defaultSelectedKeys={[newUser.bloodType]}
					onSelectionChange={(value) =>
						setNewUser({ ...newUser, bloodType: value })
					}
				>
					<SelectItem key={"AB_POSITIVE"} value={"AB_POSITIVE"}>
						AB Pozitif
					</SelectItem>

					<SelectItem key={"0_POSITIVE"} value={"0_POSITIVE"}>
						0 Pozitif
					</SelectItem>
				</Select>

				<Input
					name='phoneNumber'
					variant='bordered'
					type='text'
					label='Telefon Numarası'
					size='sm'
					value={newUser.phoneNumber}
					onValueChange={(value) =>
						setNewUser({ ...newUser, phoneNumber: value })
					}
				/>
				<Input
					name='address'
					variant='bordered'
					type='text'
					label='Ikametgah Adresi'
					size='sm'
					value={newUser.address}
					onValueChange={(value) =>
						setNewUser({ ...newUser, address: value })
					}
				/>
				<Input
					name='carPlate'
					variant='bordered'
					type='text'
					label='Arac Plakası'
					size='sm'
					value={newUser.carPlate}
					onValueChange={(value) =>
						setNewUser({ ...newUser, carPlate: value })
					}
				/>
				<Input
					name='emergencyContactName'
					variant='bordered'
					type='text'
					label='Acil Durumda Ulasilacak Kisi'
					size='sm'
					value={newUser.emergencyContactName}
					onValueChange={(value) =>
						setNewUser({ ...newUser, emergencyContactName: value })
					}
				/>
				<Input
					name='emergencyContactPhoneNumber'
					variant='bordered'
					type='text'
					label='Acil Durumda Ulasilacak Kisi Telefonu'
					size='sm'
					value={newUser.emergencyContactPhoneNumber}
					onValueChange={(value) =>
						setNewUser({
							...newUser,
							emergencyContactPhoneNumber: value,
						})
					}
				/>
			</div>
			<Button
				type='submit'
				aria-disabled={pending}
				color='danger'
				className='w-full'
			>
				Guncelle
			</Button>
		</form>
	);
}

