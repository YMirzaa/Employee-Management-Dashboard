import GuideTable from "@/components/tables/GuideTable";
import { Employee } from "@/components/tables/types";
import { getEmployeesAction } from "@/lib/actions/getEmployeesAction";

export default async function GuidePage() {
	const data: Employee[] = await getEmployeesAction();
	// console.log(data);
	const columns = [
		{ name: "Profil", uid: "fullName" },
		{ name: "Birim", uid: "unit" },
		{ name: "Ünvan", uid: "title" },
		{ name: "Rol", uid: "role" },
		{ name: "Görev", uid: "assignment" },
		{ name: "Telefon Numarası", uid: "phoneNumber" },
		{ name: "Detaylar", uid: "more" },
	];
	return (
		<div className='p-4'>
			<GuideTable columns={columns} items={data} />
		</div>
	);
}

