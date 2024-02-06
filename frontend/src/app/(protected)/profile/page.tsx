import CorporateForm from "@/components/CorporateForm";
import EmployeeForm from "@/components/EmployeeForm";
import { getUserAction } from "@/lib/actions/getUserAction";

export default async function ProfilePage() {
	const user = await getUserAction();

	// console.log(user);
	return (
		<div className='p-4 bg-black/20 h-full grid grid-cols-2 gap-4'>
			<EmployeeForm user={user} />
			<CorporateForm user={user} />
		</div>
	);
}

