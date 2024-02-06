import UpdateEmployeeForm from "@/components/UpdateEmployeeForm";
import UploadProfilePhoto from "@/components/UploadProfilePhoto";
import ProfileImage from "@/components/getProfileImage";
import { getEmployeeAction } from "@/lib/actions/getEmployeeAction";
import { getProfilePhoto } from "@/lib/api-requests/getProfilePhoto";
import { Image } from "@nextui-org/react";

export default async function UserPage({
	params,
}: {
	params: {
		id: string;
	};
}) {
	const user = await getEmployeeAction(params.id);
	let url;
	if (user.photoId) {
		url = await getProfilePhoto({ id: params.id as string });
	}
	return (
		<div className='p-4 bg-black/15'>
			{/* {url ? <ProfileImage url={url} /> : null} */}
			{/* <UploadProfilePhoto id={params.id} /> */}
			<UpdateEmployeeForm user={user} url={url} />
		</div>
	);
}

