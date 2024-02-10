import "@/styles/globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";
import clsx from "clsx";
import { Divider } from "@nextui-org/divider";

export const metadata: Metadata = {
	title: {
		default: "경기대학교 강의 시간표",
		template: `%s - 경기대학교 강의 시간표`,
	},
	description: "경기대학교 강의 시간표 서비스",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
					<div className="relative flex flex-col h-screen">
						<main className="container mx-auto max-w-7xl pt-8 px-6 flex-grow">
							{children}
						</main>
						<Divider />
						<footer className="w-full flex items-center justify-start p-4">
							<p className="text-[0.5rem]">
								서비스명: 경기대학교 강의 시간표 <br />
								제작자: 방진혁<br />
								깃허브: <a href="https://github.com/jinhyeokfang">https://github.com/jinhyeokfang</a> <br/>
							</p>
						</footer>
					</div>
				</Providers>
			</body>
		</html>
	);
}
