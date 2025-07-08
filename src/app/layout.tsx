import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/nav-bar";

export const metadata: Metadata = {
  title: "Kaiwei Zhang's Blog | 随手记",
  description: "Frontend, Backend, AI and Web3",
  keywords: ["Frontend", "Backend", "AI", "Blog", "Coding", "Kaiwei Zhang"],
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
      </body>
    </html>
  );
}
