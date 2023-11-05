import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Tyler Smart",
    description: "Tyler Smart's personal website",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={roboto.className}>
            <body className="min-h-screen">{children}</body>
        </html>
    );
}
