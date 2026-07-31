import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
	const requestHeaders = await headers();
	const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost";
	const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
	const origin = `${protocol}://${host}`;
	const title = "Celephais Labs | Software Engineering & Scientific Computing";
	const description = "Founder-led software engineering, scientific computing, simulation, and digital product development for technically demanding teams.";

	return {
		metadataBase: new URL(origin),
		title,
		description,
		icons: {
			icon: "/brand-mark.png",
			shortcut: "/brand-mark.png",
		},
		openGraph: {
			type: "website",
			url: origin,
			siteName: "Celephais Labs",
			title,
			description,
			images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Celephais Labs — Engineering for ambitious ideas." }],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [`${origin}/og.png`],
		},
	};
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
		</html>
	);
}
