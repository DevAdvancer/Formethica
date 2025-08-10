'use client'

import { AuthProvider } from "@/lib/auth-context";
import { AuthModalProvider } from "@/lib/auth-modal-context";
import { ConfirmationProvider } from "@/lib/confirmation-context";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import AIChatbotLazy from "@/components/ai-chatbot-lazy";
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
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="relative z-10 flex-1">{children}</main>
            <Footer />
            <AIChatbotLazy />
            <AuthModalWrapper />
          </div>
        </ConfirmationProvider>
      </AuthModalProvider>
    </AuthProvider>
  );
}
