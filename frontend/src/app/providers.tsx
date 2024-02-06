"use client";

import { NextUIProvider } from "@nextui-org/react";
import AuthenticationProvider from "@/context/AuthenticationContext";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<AuthenticationProvider>
			<NextUIProvider>{children}</NextUIProvider>
		</AuthenticationProvider>
	);
}

