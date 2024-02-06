"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useFormState, useFormStatus } from "react-dom";
import { Avatar, Select, SelectItem } from "@nextui-org/react";
import { createEmployeeAction } from "@/lib/actions/createEmployeeAction";

export default function CreateEmployeeForm({ user }: any) {
	const [formState, formAction] = useFormState(createEmployeeAction, {
		message: null,
		errors: undefined,
	});
	const { pending } = useFormStatus();

	return (
		<form action={formAction} className='bg-white p-2 rounded-lg'>
			<div>
				<div className='flex justify-between px-2'>
					<h1 className='text-lg font-bold'>Kisisel</h1>
				</div>
				<div className='grid grid-cols-2 gap-2 py-2'>
					<Input
						name='name'
						variant='bordered'
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
					/>
					<Input
						name='tcNo'
						variant='bordered'
						type='text'
						label='TC Kimlik Numarası'
						size='sm'
					/>

					<Select
						name='gender'
						label='Cinsiyet'
						size='sm'
						variant='bordered'
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
					/>
					<Input
						name='birthDate'
						variant='bordered'
						type='date'
						label='Dogum Tarihi'
						placeholder='Dogum gunu'
						size='sm'
					/>
					<Select
						name='bloodType'
						label='Kan grubu'
						size='sm'
						variant='bordered'
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
					/>
					<Input
						name='address'
						variant='bordered'
						type='text'
						label='Ikametgah Adresi'
						size='sm'
					/>
					<Input
						name='carPlate'
						variant='bordered'
						type='text'
						label='Arac Plakası'
						size='sm'
					/>
					<Input
						name='emergencyContactName'
						variant='bordered'
						type='text'
						label='Acil Durumda Ulasilacak Kisi'
						size='sm'
					/>
					<Input
						name='emergencyContactPhoneNumber'
						variant='bordered'
						type='text'
						label='Acil Durumda Ulasilacak Kisi Telefonu'
						size='sm'
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
					/>
					<Input
						name='personnelCadre'
						variant='bordered'
						type='text'
						label='Personel Kadrosu'
						size='sm'
					/>
					<Input
						name='title'
						variant='bordered'
						type='text'
						label='Unvan'
						size='sm'
					/>

					<Select
						name='unit'
						label='Birim'
						size='sm'
						variant='bordered'
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
					/>
					<Input
						name='workType'
						variant='bordered'
						type='text'
						label='Calisma Sekli'
						size='sm'
					/>

					<Input
						name='internalNumber'
						variant='bordered'
						type='number'
						label='Dahili Numara'
						size='sm'
					/>
					<Input
						name='roomNumber'
						variant='bordered'
						type='number'
						label='Oda Numarasi'
						size='sm'
					/>
					<Input
						name='enterenceDate'
						variant='bordered'
						type='date'
						label='Giris Tarihi'
						size='sm'
						placeholder='-'
					/>
				</div>
			</div>

			<Button
				type='submit'
				aria-disabled={pending}
				color='danger'
				className='w-full'
			>
				Olustur
			</Button>
		</form>
	);
}

