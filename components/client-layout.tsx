'use client'

import { AuthProvider } from "@/lib/auth-context";
import { AuthModalProvider } from "@/lib/auth-modal-context";
import { ConfirmationProvider } from "@/lib/confirmation-context";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import AIChatbot from "@/components/ai-chatbot";
import AuthModalWrapper from "@/components/auth/auth-modal-wrapper";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthModalProvider>
        <ConfirmationProvider>
          <div className="min-h-screen">
            <Navigation />
            <main className="relative z-10 min-h-screen">{children}</main>
            <Footer />
            <AIChatbot />
            <AuthModalWrapper />
          </div>
        </ConfirmationProvider>
      </AuthModalProvider>
    </AuthProvider>
  );
}
