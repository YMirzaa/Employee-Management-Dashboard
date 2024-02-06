"use client";

import { Image } from "@nextui-org/react";

const ProfileImage = ({ url }: any) => {
	return (
		<div className='row-span-4 justify-self-center'>
			<Image
				src={url}
				width={200}
				height={200}
				alt='Profile Picture'
				className='rounded-full '
			/>
		</div>
	);
};
export default ProfileImage;

