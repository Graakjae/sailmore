"use client";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./authContext";
import NavigationsBar from "@/components/NavigationBar";
const quicksand = Quicksand({ subsets: ["latin"] });

// export const metadata = {
//     title: "Create Next App",
//     description: "Generated by create next app"
// };

export default function RootLayout({ children }) {
    return (
        <AuthProvider>
            <html lang="en">
                <body className={quicksand.className}>
                    <NavigationsBar />
                    {children}
                </body>
            </html>
        </AuthProvider>
    );
}
