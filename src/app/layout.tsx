import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/nav-bar";

export const metadata: Metadata = {
  title: "Kaiwei Zhang's Blog | 前端开发与技术分享",
  description: "记录前端开发、技术成长和生活点滴，分享实用的编程经验与见解。",
  keywords: ["前端", "后端", "AI", "博客", "技术分享", "编程", "Kaiwei Zhang"],
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
