import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/client-layout";

export const metadata: Metadata = {
  title: "FormCraft AI - Intelligent Form Builder",
  description: "Create beautiful forms with AI-powered suggestions and advanced analytics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen animated-bg">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
