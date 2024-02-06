export type CorporateProfile = {
	recordNumber: string;
	personnelCadre: string;
	title: string;
	unit: string;
	assignment: string;
	workType: string;
	internalNumber: string;
	roomNumber: string;
	enterenceDate: {
		year: number;
		month: number;
		day: number;
	};
};
export type Employee = {
	email: string;
	name: string;
	lastName: string;
	phoneNumber: string;
	carPlate: string;
	tcNo: string;
	address: string;
	emergencyContactName: string;
	emergencyContactPhoneNumber: string;
	gender: string;
	bloodType: string;
	fullName: string;
	birthDate: {
		year: number;
		month: number;
		day: number;
	};
	corporateProfileDto: CorporateProfile;
};

