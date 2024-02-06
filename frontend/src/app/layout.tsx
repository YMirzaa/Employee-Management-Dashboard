import type { Metadata } from "next";
import { inter } from "@/app/ui/fonts";
import "@/app/globals.css";
import RouteProtection from "../components/RouteProtection";

// Components
import { Providers } from "./providers";

export const metadata: Metadata = {
	title: "Tubitak BILGEM",
	description: "Created By Yusuf Mirza Altay",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${inter.className}`}>
				<main className='light text-foreground bg-background h-full '>
					<Providers>{children}</Providers>
				</main>
			</body>
		</html>
	);
}

