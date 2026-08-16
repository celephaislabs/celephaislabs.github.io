import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = "https://celephaislabs.com";
const title = "Celephais Labs | Software Engineering & Scientific Computing";
const description = "Founder-led software engineering, scientific computing, simulation, and digital product development for technically demanding teams.";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title,
	description,
	icons: {
		icon: "/brand-mark.png",
		shortcut: "/brand-mark.png",
	},
	openGraph: {
		type: "website",
		url: siteUrl,
		siteName: "Celephais Labs",
		title,
		description,
		images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: "Celephais Labs — Engineering for ambitious ideas." }],
	},
	twitter: {
		card: "summary_large_image",
		title,
		description,
		images: [`${siteUrl}/og.png`],
	},
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
		</html>
	);
}
