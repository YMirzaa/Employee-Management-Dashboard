import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

export default async function NewsPage() {
	return (
		<div className='h-full'>
			<Card className='h-full '>
				<CardHeader className='absolute z-10 top-1'>
					<p className='text-xl font-medium text-white/80 uppercase'>
						Haberler
					</p>
					{/* <h4 className='text-white/80 font-medium text-2xl'>News</h4> */}
				</CardHeader>
				<Image
					removeWrapper
					alt='Relaxing app background'
					className='z-0 w-full h-full object-cover aspect-[2]'
					src='/images/loginBG.jpg'
				/>
				<CardBody className='absolute bg-white/50 bottom-1/3 z-10 '>
					<p className='text-base font-medium text-black/80'>
						Make beautiful websites regardless of your design
						experience.
					</p>
				</CardBody>
			</Card>
		</div>
	);
}

