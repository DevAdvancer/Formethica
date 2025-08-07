import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/client-layout";

export const metadata: Metadata = {
  title: "Formethica - Intelligent Form Builder",
  description: "Create beautiful forms with AI-powered suggestions and advanced analytics",
  authors: [{ name: "Abhirup Kumar" }],
  keywords: [
    "form builder",
    "AI forms",
    "intelligent forms",
    "online form creator",
    "form automation",
    "survey builder",
    "form analytics",
    "drag and drop forms",
    "responsive forms",
    "custom forms",
    "form templates",
    "no code forms",
    "form generator",
    "data collection",
    "lead generation forms",
    "contact forms",
    "feedback forms",
    "registration forms",
    "Google Forms alternative",
    "form integrations",
    "secure forms",
    "workflow automation",
    "form design",
    "form validation",
    "conditional logic forms",
    "multi-step forms"
  ],
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
