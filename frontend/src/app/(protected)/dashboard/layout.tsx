import Navbar from "@/components/Navbar";

export default function DashboardLayout(props: {
	children: React.ReactNode;
	news: React.ReactNode;
	birthdays: React.ReactNode;
	welcomes: React.ReactNode;
	table: React.ReactNode;
}) {
	return (
		<div>
			<div className='h-2/3'>{props.table}</div>
			<div className='grid lg:grid-cols-5 lg:grid-rows-1 row-auto gap-4 pb-4 px-4 grid-cols-1'>
				<div className='lg:col-span-2'>{props.news}</div>
				<div>{props.birthdays}</div>
				<div>{props.welcomes}</div>
			</div>
		</div>
	);
}

