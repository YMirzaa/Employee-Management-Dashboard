"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuthentication } from "../context/AuthenticationContext";

const RouteProtection = (props: {
	children: React.ReactNode;
	protected: React.ReactNode;
	unprotected: React.ReactNode;
}) => {
	const router = useRouter();
	const { isAuthenticated } = useAuthentication();

	return isAuthenticated ? props.protected : props.unprotected;
};

export default RouteProtection;

