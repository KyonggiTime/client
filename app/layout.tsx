import "@/styles/globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";
import clsx from "clsx";
import { Divider } from "@nextui-org/divider";
import { HeaderBar } from "@/components/header-bar.component";
import { Analytics } from '@vercel/analytics/react';
import { Noto_Sans_KR } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";

const notoSansKr = Noto_Sans_KR({
  weight: ['500'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
	title: {
		default: "경기타임",
		template: `%s - 경기타임`,
	},
	description: "경기타임: 경기대학교 강의 시간표 서비스",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
	openGraph: {
		title: "경기타임",
		description: "경기타임: 경기대학교 강의 시간표 서비스",
		type: "website",
		url: "https://kyonggiti.me"
	}
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta name="naver-site-verification" content="d8eb1b5bd2c665ef7273911ae879c92011691d01" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
				<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
				<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
				<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
				<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
				<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
				<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
				<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
				<link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/manifest.json" />
				<meta name="msapplication-TileColor" content="#0070f0" />
				<meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
				<meta name="theme-color" content="#0070f0" />
			</head>
			<body
				className={clsx(
					`bg-gray-100 antialiased ${notoSansKr.className}`,
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
						<HeaderBar />
						<div className="relative flex flex-col h-screen">
							<main className="container mx-auto max-w-7xl pt-8 mb-10 px-6 flex-grow">
								{children}
							</main>
							<Divider />
							<footer className="w-full flex items-center justify-start p-4">
								<p className="text-sm">
									서비스명: 경기타임 : 경기대학교 강의 시간표 <br />
									제작자: 방진혁 (<a href="https://jinhy.uk">https://jinhy.uk</a>)<br />
									깃허브: <a href="https://github.com/jinhyeokfang">https://github.com/jinhyeokfang</a> <br/>
								</p>
							</footer>
						</div>
				</Providers>
				<Analytics />
				<GoogleAnalytics gaId="G-5M7C00GWRV" />
				<Script strategy='lazyOnload'>
					{
						`(function(c,l,a,r,i,t,y){
							c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
							t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
							y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
						})(window, document, "clarity", "script", "mlguu9nd2p");`
					}
				</Script>
			</body>
		</html>
	);
}
