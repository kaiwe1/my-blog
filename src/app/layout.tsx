import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Kaiwei",
  description: "Kaiwei's personal website",
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
