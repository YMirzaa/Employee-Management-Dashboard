import { getUserAction } from "@/lib/actions/getUserAction";
import { Avatar } from "@nextui-org/avatar";
import Image from "next/image";
import Link from "next/link";

export default async function Navbar() {
	const user = await getUserAction();
	return (
		<nav className='flex justify-between bg-default p-4'>
			{/* Logo */}
			<div className='flex items-center'>
				<Image
					src='/vercel.svg'
					alt='Vercel Logo'
					width={72}
					height={16}
					className='border-r-1 border-gray-400 pr-4'
				/>
				<h1 className='text-sm font-semibold pl-4 '>
					Personel Bilgi Sistemi
				</h1>
			</div>
			<div className='flex  gap-4'>
				<div className='flex items-center gap-4 border-r-1 border-gray-400 pr-4'>
					{/* Links */}
					<Link href='/general'>Genel</Link>
					<Link href='/guide'>Rehber</Link>

					<Link href='/organization-schema'>Organizasyon Şeması</Link>
				</div>
				{/* User */}
				<Link
					href='/pbs/profile'
					className='flex items-center gap-2 border-r-1 border-gray-400 pr-4'
				>
					{/* <Avatar
						src='https://i.pravatar.cc/150?u=a04258114e29026302d'
						size='md'
					/> */}
					<p className='text-sm font-semibold'>{user.fullName}</p>
				</Link>
				{/* Logout */}
				<Link href='/logout' className='flex items-center gap-2'>
					<Image
						src='/vercel.svg'
						alt='Vercel Logo'
						width={72}
						height={16}
					/>
				</Link>
			</div>
		</nav>
	);
}

