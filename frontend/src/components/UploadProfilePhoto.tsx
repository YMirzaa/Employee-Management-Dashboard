"use client";

import React, { useCallback } from "react";
import { uploadProfilePhoto } from "@/lib/api-requests/uploadProfilePhoto";
import { useDropzone } from "react-dropzone";
import { Button, Image } from "@nextui-org/react";

const UploadProfilePhoto = ({ id }: any) => {
	const [files, setFiles] = React.useState<any>([]);
	const onDrop = useCallback((acceptedFiles: any) => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
		setFiles(
			acceptedFiles.map((file: any) => (
				<li key={file.path} className='relative'>
					<Image
						src={URL.createObjectURL(file)}
						alt={file.name}
						width={120}
					/>
				</li>
			))
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
		useDropzone({
			maxFiles: 1,
			accept: {
				"image/png": [".png"],
				"image/jpeg": [".jpeg"],
				"image/jpg": [".jpg"],
			},
			onDrop,
		});

	// const files = acceptedFiles.map((file: any) => (
	// 	<li key={file.path} className='relative'>
	// 		<Image
	// 			src={URL.createObjectURL(file)}
	// 			alt={file.name}
	// 			width={120}
	// 		/>
	// 	</li>
	// ));
	return (
		<section
			className={`${
				files.length >= 1 ? "row-span-4" : "row-span-2"
			} flex flex-col items-center p-5 border-2 rounded-sm border-[#eeeeee] border-dashed bg-white text-[#bdbdbd] outline-none
		`}
		>
			<div
				{...getRootProps({
					className: `${
						files.length >= 1 ? "hidden" : ""
					} flex flex-col items-center p-5 border-2 rounded-sm border-[#eeeeee] border-dashed bg-[#fafafa] text-[#bdbdbd] outline-none
        `,
				})}
			>
				<input {...getInputProps()} />
				{isDragActive ? (
					<p>Drop the picture here ...</p>
				) : (
					<p>
						Drag and drop picture here, or click to select picture
					</p>
				)}
			</div>
			{/* Preview */}
			{files.length >= 1 ? (
				<>
					<aside>
						<h4>Preview</h4>
						<ul>{files}</ul>
					</aside>
					<div className='flex gap-2'>
						<Button
							size='sm'
							className='mt-2'
							onClick={() => {
								const formData = new FormData();

								formData.set("file", acceptedFiles[0]);

								uploadProfilePhoto({
									id: id,
									formData: formData,
								})
									.then((res) => {
										console.log(res);
									})
									.catch((err) => {
										console.log(err);
									});
							}}
						>
							Kaydet
						</Button>
						<Button
							size='sm'
							className='mt-2'
							onClick={() => {
								setFiles([]);
							}}
						>
							Vazgeç
						</Button>
					</div>
				</>
			) : null}
		</section>
	);
};

export default UploadProfilePhoto;

