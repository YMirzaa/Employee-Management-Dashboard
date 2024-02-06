import { Avatar, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default async function BirthdayPage() {
	return (
		<Card className='lg:h-full h-auto'>
			<CardHeader>
				<p className='text-sm font-medium text-black/90 uppercase'>
					Bu Ay Doğanlar
				</p>
			</CardHeader>
			<Divider />
			<CardBody className='flex items-center gap-2 flex-col'>
				<Avatar
					alt='Relaxing app background'
					src='/images/loginBG.jpg'
					// className='w-32 h-32 text-large '
					size='lg'
				/>
				<p className='font-bold'>İyi Ki Doğdun!</p>
				<p className='text-red-600 font-bold text-base'>Yusuf Mirza </p>
				<p className='font-light text-black/60'>Nice mutlu yıllara</p>
				<p className='font-bold'>10 Haziran</p>
			</CardBody>
		</Card>
	);
}

