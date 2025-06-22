import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/nav-bar";

export const metadata: Metadata = {
  title: "Kaiwei",
  description: "Kaiwei's blog",
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
        {children}
      </body>
    </html>
  );
}
