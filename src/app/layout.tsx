import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/nav-bar";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "KZ's Blog",
  description: "Frontend, Backend, AI and Web3",
  keywords: ["Frontend", "Backend", "AI", "Blog", "Coding", "KZ"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <NavBar />
        <div className="mx-48 my-12">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
