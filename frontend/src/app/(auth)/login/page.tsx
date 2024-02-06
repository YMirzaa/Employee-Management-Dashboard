"use client";
import React, { useState } from "react";

import LoginForm from "@/components/LoginForm";
export default function LoginPage() {
	return (
		<div className='grid grid-cols-2 grid-rows-2 h-screen'>
			<LoginForm />
		</div>
	);
}

