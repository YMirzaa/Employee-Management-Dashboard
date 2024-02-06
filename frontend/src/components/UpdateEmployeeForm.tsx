"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useFormState, useFormStatus } from "react-dom";
import { Select, SelectItem } from "@nextui-org/react";
import { getEmployeeAction } from "@/lib/actions/getEmployeeAction";
import UploadProfilePhoto from "./UploadProfilePhoto";
import ProfileImage from "./getProfileImage";
import { getProfilePhoto } from "@/lib/api-requests/getProfilePhoto";

export default function UpdateEmployeeForm({ user, url }: any) {
	const [showProfilePhoto, setShowProfilePhoto] = useState<boolean>(!!url);
	useEffect(() => {
		if (url) {
			setShowProfilePhoto(true);
			``;
		}
	}, [url]);

	const [formState, formAction] = useFormState(getEmployeeAction, {
		message: null,
		errors: undefined,
	});
	const { pending } = useFormStatus();

	return (
		<>
			{/* {url ? <ProfileImage url={url} /> : null} */}
			{/* <UploadProfilePhoto id={user.id} /> */}
			<form action={formAction} className='bg-white p-2 rounded-lg'>
				<div>
					<div className='flex justify-between px-2'>
						<h1 className='text-lg font-bold'>Kisisel</h1>
					</div>
					<div className='grid grid-cols-2 sm:gap-2 gap-4 py-2'>
						<Input
							name='name'
							variant='bordered'
							type='text'
							label='Ad'
							size='sm'
							defaultValue={user?.name}
						/>
						{showProfilePhoto ? (
							<ProfileImage url={url} />
						) : (
							<UploadProfilePhoto id={user.id} />
						)}

						<Input
							name='lastname'
							variant='bordered'
							type='text'
							label='Soyad'
							size='sm'
							defaultValue={user?.lastName}
						/>
						<Input
							name='tcNo'
							variant='bordered'
							type='text'
							label='TC Kimlik Numarası'
							size='sm'
							defaultValue={user?.tcNo}
						/>

						<Select
							name='gender'
							label='Cinsiyet'
							size='sm'
							variant='bordered'
							defaultSelectedKeys={
								user?.gender
									? [user?.gender as string]
									: undefined
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
							defaultValue={user?.email}
						/>
						<Input
							name='birthDate'
							variant='bordered'
							type='date'
							label='Dogum Tarihi'
							placeholder='Dogum gunu'
							size='sm'
							defaultValue={
								user?.birthDate
									? new Date(user?.birthDate.toString())
											.toISOString()
											.split("T")[0]
									: undefined
							}
						/>
						<Select
							name='bloodType'
							label='Kan grubu'
							size='sm'
							variant='bordered'
							defaultSelectedKeys={
								user?.bloodType
									? [user?.bloodType as string]
									: undefined
							}
						>
							<SelectItem
								key={"AB_POSITIVE"}
								value={"AB_POSITIVE"}
							>
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
							defaultValue={user?.phoneNumber}
						/>
						<Input
							name='address'
							variant='bordered'
							type='text'
							label='Ikametgah Adresi'
							size='sm'
							defaultValue={user?.address}
						/>
						<Input
							name='carPlate'
							variant='bordered'
							type='text'
							label='Arac Plakası'
							size='sm'
							defaultValue={user?.carPlate}
						/>
						<Input
							name='emergencyContactName'
							variant='bordered'
							type='text'
							label='Acil Durumda Ulasilacak Kisi'
							size='sm'
							defaultValue={user?.emergencyContactName}
						/>
						<Input
							name='emergencyContactPhoneNumber'
							variant='bordered'
							type='text'
							label='Acil Durumda Ulasilacak Kisi Telefonu'
							size='sm'
							defaultValue={user?.emergencyContactPhoneNumber}
						/>
					</div>
				</div>
				<div>
					<div className='flex justify-between px-2'>
						<h1 className='text-lg font-bold'>Kurumsal</h1>
					</div>
					<div className='grid grid-cols-2 gap-2 py-2'>
						<Input
							name='recordNumber'
							variant='bordered'
							type='text'
							label='Personel Sicil Numarası'
							size='sm'
							defaultValue={
								user?.corporateProfileDto?.recordNumber
							}
						/>
						<Input
							name='personnelCadre'
							variant='bordered'
							type='text'
							label='Personel Kadrosu'
							size='sm'
							defaultValue={
								user?.corporateProfileDto?.personnelCadre
							}
						/>
						<Input
							name='title'
							variant='bordered'
							type='text'
							label='Unvan'
							size='sm'
							defaultValue={user?.corporateProfileDto?.title}
						/>

						<Select
							name='unit'
							label='Birim'
							size='sm'
							variant='bordered'
							// defaultSelectedKeys={[
							// 	user?.corporateProfileDto?.unit as string,
							// ]}
						>
							<SelectItem key={"Yazilim"} value={"Yazilim"}>
								Yazilim
							</SelectItem>

							<SelectItem
								key={"Insan Kayknaklari"}
								value={"Insan Kayknaklari"}
							>
								Insan Kayknaklari
							</SelectItem>
						</Select>

						<Input
							name='assignment'
							variant='bordered'
							type='text'
							label='Gorev'
							size='sm'
							defaultValue={user?.corporateProfileDto?.assignment}
						/>
						<Input
							name='workType'
							variant='bordered'
							type='text'
							label='Calisma Sekli'
							size='sm'
							defaultValue={user?.corporateProfileDto?.workType}
						/>

						<Input
							name='internalNumber'
							variant='bordered'
							type='number'
							label='Dahili Numara'
							size='sm'
							defaultValue={
								user?.corporateProfileDto?.internalNumber
							}
						/>
						<Input
							name='roomNumber'
							variant='bordered'
							type='number'
							label='Oda Numarasi'
							size='sm'
							defaultValue={user?.corporateProfileDto?.roomNumber}
						/>
						<Input
							name='enterenceDate'
							variant='bordered'
							type='date'
							label='Giris Tarihi'
							size='sm'
							placeholder='-'
							defaultValue={
								user?.corporateProfileDto?.enterenceDate
									? new Date(
											user?.corporateProfileDto?.enterenceDate.toString()
									  )
											.toISOString()
											.split("T")[0]
									: undefined
							}
						/>
					</div>
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
		</>
	);
}

