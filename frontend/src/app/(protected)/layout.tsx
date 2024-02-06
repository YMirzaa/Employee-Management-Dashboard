import Navbar from "@/components/Navbar";

export default function ProfileLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='h-full relative'>
			<main>
				<Navbar />
				{children}
			</main>
		</div>
	);
}

