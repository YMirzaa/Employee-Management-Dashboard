import CorporateForm from "@/components/CorporateForm";
import CreateEmployeeForm from "@/components/CreateEmployeeForm";
import EmployeeForm from "@/components/EmployeeForm";
import { getUserAction } from "@/lib/actions/getUserAction";

export default async function createEmployeePage() {
	const user = await getUserAction();

	// console.log(user);
	return (
		<div className='p-8 bg-black/10'>
			<CreateEmployeeForm />
		</div>
	);
}

