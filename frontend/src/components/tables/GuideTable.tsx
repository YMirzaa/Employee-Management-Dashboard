"use client";
import React, { useEffect } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Chip,
	User,
	Pagination,
	Selection,
	ChipProps,
	SortDescriptor,
	getKeyValue,
	Tooltip,
	Spinner,
} from "@nextui-org/react";
import { SearchIcon } from "@/icons/SearchIcon";
import { ChevronDownIcon } from "@/icons/ChevronDownIcon";
import { columns, users } from "./data";
import { VerticalDotsIcon } from "@/icons/VerticalDotsIcon";
import { getEmployeesAction } from "@/lib/actions/getEmployeesAction";
import { Employee, CorporateProfile } from "./types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { EyeIcon } from "@/icons/EyeIcon";
import { PlusIcon } from "@/icons/PlusIcon";

export default function GuideTable({
	columns,
	pageData,
	baseUrl,
}: {
	columns: { name: string; uid: string }[];
	pageData: any;
	baseUrl: string;
}) {
	const [loadingState, setLoadingState] = React.useState<string>("idle");
	useEffect(() => {
		setLoadingState("idle");
	}, [pageData]);

	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
		new Set(columns.map((column) => column.uid))
	);

	// const [rowsPerPage, setRowsPerPage] = React.useState(3);
	// const pages = Math.ceil(items.length / rowsPerPage);

	const onClear = React.useCallback(() => {
		const params = new URLSearchParams(searchParams);
		params.delete("search");
		params.delete("page");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const headerColumns = React.useMemo(() => {
		if (visibleColumns === "all") return columns;

		return columns.filter((column) =>
			Array.from(visibleColumns).includes(column.uid)
		);
	}, [columns, visibleColumns]);

	const onSearchChange = useDebouncedCallback((value?: string) => {
		const params = new URLSearchParams(searchParams);
		if (value) {
			params.set("name", value);
			params.set("page", "0");
		} else {
			params.delete("name");
			params.delete("page");
		}
		router.replace(`${pathname}?${params.toString()}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, 300);

	const onRowsPerPageChange = React.useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			// setRowsPerPage(Number(e.target.value));
			// setPage(1);
		},
		[]
	);
	const onPageChange = React.useCallback(
		(pageNumber: number) => {
			setLoadingState("loading");
			const params = new URLSearchParams(searchParams);
			params.set("page", (pageNumber - 1).toString());
			router.replace(`${pathname}?${params.toString()}`);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const onNextPage = React.useCallback(() => {
		const params = new URLSearchParams(searchParams);
		params.set("page", (pageData.pageable.pageNumber + 1).toString());
		router.replace(`${pathname}?${params.toString()}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageData.pageable.pageNumber, pageData.totalPages]);

	const onPreviousPage = React.useCallback(() => {
		const params = new URLSearchParams(searchParams);
		params.set("page", (pageData.pageable.pageNumber - 1).toString());
		router.replace(`${pathname}?${params.toString()}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageData.pageable.pageNumber]);

	const renderCell = React.useCallback((user: any, columnKey: React.Key) => {
		const cellValue = user[columnKey as keyof any];
		let url;

		if (user.photoId) {
			url = `${baseUrl}/employee/${user.id}/photo`;
		} else {
			url = "https://i.pravatar.cc/150?u=a042581f4e29026024d";
		}
		switch (columnKey) {
			case "fullName":
				return (
					<User
						avatarProps={{
							radius: "lg",
							src: url,
						}}
						description={user.email}
						name={cellValue as String}
					></User>
				);
			case "unit":
				return user.corporateProfileDto.unit;
			case "role":
				return (
					<div className='flex flex-col'>
						<p className='text-bold text-sm capitalize'>
							{user.corporateProfileDto.unit}
						</p>
						<p className='text-bold text-sm capitalize text-default-400'>
							{user.corporateProfileDto.title}
						</p>
					</div>
				);
			case "title":
				return user.corporateProfileDto.title;
			case "assignment":
				return user.corporateProfileDto.assignment;
			case "phoneNumber":
				return cellValue as string;
			case "more":
				return (
					<Tooltip content='Detaylar'>
						<span
							className='text-lg text-default-400 cursor-pointer active:opacity-50'
							onClick={() => router.push(`/user/${user.id}`)}
						>
							<EyeIcon />
						</span>
					</Tooltip>
				);
			default:
				return cellValue as string;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const topContent = React.useMemo(() => {
		return (
			<div className='flex flex-col gap-2'>
				<h1>Rehber</h1>
				<div className='flex justify-between gap-2 items-end'>
					<Input
						isClearable
						className='w-full sm:max-w-[44%]'
						placeholder='İsim Soyisim...'
						startContent={<SearchIcon />}
						// value={filterValue}
						// defaultValue={searchParams.get("search")?.toString()} // only uncontrolled
						onClear={onClear}
						onValueChange={onSearchChange}
					/>

					<div className='flex gap-3'>
						<Dropdown>
							<DropdownTrigger className='hidden sm:flex'>
								<Button
									endContent={
										<ChevronDownIcon className='text-small' />
									}
									variant='flat'
								>
									Sütunlar
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label='Table Columns'
								closeOnSelect={false}
								selectedKeys={visibleColumns}
								selectionMode='multiple'
								onSelectionChange={setVisibleColumns}
							>
								{columns.map((column) => (
									<DropdownItem key={column.uid}>
										{column.name}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						{/* TODO: Add Funcionality */}
						<Button
							color='danger'
							endContent={<PlusIcon />}
							onClick={() => {
								router.push("/employee/create");
							}}
						>
							Personel Ekle
						</Button>
					</div>
				</div>
			</div>
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visibleColumns]);

	const bottomContent = React.useMemo(() => {
		return (
			<div className=' flex justify-between items-center'>
				<Pagination
					isCompact
					showControls
					showShadow
					color='primary'
					page={pageData.pageable.pageNumber + 1}
					total={pageData.totalPages}
					onChange={onPageChange}
				/>
				<div className='hidden sm:flex w-[30%] justify-end gap-2'>
					<Button
						isDisabled={
							pageData.totalPages === 1 ||
							pageData.pageable.pageNumber === 0
						}
						size='sm'
						variant='flat'
						onPress={onPreviousPage}
					>
						Previous
					</Button>
					<Button
						isDisabled={
							pageData.totalPages === 1 || pageData.last == true
						}
						size='sm'
						variant='flat'
						onPress={onNextPage}
					>
						Next
					</Button>
				</div>
			</div>
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageData.pageable.pageNumber, pageData.totalPages]);

	return (
		<Table
			aria-label='Example table with dynamic content'
			topContent={topContent}
			bottomContent={bottomContent}
			title='Rehber'
		>
			<TableHeader columns={headerColumns}>
				{(column) => (
					<TableColumn key={column.uid}>{column.name}</TableColumn>
				)}
			</TableHeader>
			<TableBody
				items={pageData.content as any[]}
				emptyContent='Kayıt bulunamadı.'
				loadingContent={<Spinner />}
				loadingState={loadingState as any}
			>
				{(item) => (
					<TableRow key={item.email}>
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}

