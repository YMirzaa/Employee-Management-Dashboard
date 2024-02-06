import GuideTable from "@/components/tables/GuideTable";
import { Employee } from "@/components/tables/types";
import { getEmployeesAction } from "@/lib/actions/getEmployeesAction";

export default async function DashboardPage({
	searchParams,
}: {
	searchParams?: {
		name?: string;
		page?: string;
	};
}) {
	const data: any = await getEmployeesAction(
		searchParams?.name,
		searchParams?.page
	);

	const columns = [
		{ name: "Profil", uid: "fullName" },
		{ name: "Birim", uid: "unit" },
		{ name: "Ünvan", uid: "title" },
		{ name: "Rol", uid: "role" },
		{ name: "Görev", uid: "assignment" },
		{ name: "Telefon Numarası", uid: "phoneNumber" },
		{ name: "Detaylar", uid: "more" },
	];
	const baseUrl = process.env.BASE_URL;
	return (
		<div className='p-4'>
			<GuideTable columns={columns} pageData={data} baseUrl={baseUrl!} />
		</div>
	);
}

