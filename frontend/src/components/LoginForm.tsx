"use client";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { loginUserAction } from "@/lib/actions/authenticationAction";
import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashedFilledIcon";

export default function LoginForm() {
	const [formState, formAction] = useFormState(loginUserAction, {
		message: null,
		errors: undefined,
		data: undefined,
	});
	const { pending } = useFormStatus();
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useEffect(() => {
		console.log(formState);
	}, [formState]);

	const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<form
			action={formAction}
			autoComplete='off'
			className='col-start-1 row-span-2 flex flex-col items-center justify-center w-full h-full p-4 space-y-4 '
		>
			<Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
			<h1 className='text-lg font-bold'>Personel Bilgi Sistemi</h1>

			<Input
				isRequired
				name='username'
				variant='bordered'
				autoComplete='off'
				isInvalid={!!formState.errors?.username}
				errorMessage={formState.errors?.username ?? ""}
				type='text'
				label='Kullanıcı Adı / E-Posta'
				className='max-w-xs'
			/>

			<Input
				isRequired
				name='password'
				label='Şifre'
				variant='bordered'
				isInvalid={!!formState.errors?.password}
				errorMessage={formState.errors?.password ?? ""}
				endContent={
					<button
						className='focus:outline-none'
						type='button'
						onClick={toggleVisibility}
					>
						{isVisible ? (
							<EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
						) : (
							<EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
						)}
					</button>
				}
				type={isVisible ? "text" : "password"}
				className='max-w-xs'
			/>
			<Button
				type='submit'
				aria-disabled={pending}
				color='danger'
				className='max-w-xs w-full'
			>
				Giriş Yap
			</Button>
		</form>
	);
}

