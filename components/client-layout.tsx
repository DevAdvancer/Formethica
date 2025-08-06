'use client'

import { useEffect, useState } from 'react'
import { AuthProvider } from "@/lib/auth-context";
import { AuthModalProvider } from "@/lib/auth-modal-context";
import { ConfirmationProvider } from "@/lib/confirmation-context";
import Navigation from "@/components/navigation";
import AIChatbot from "@/components/ai-chatbot";
import AuthModalWrapper from "@/components/auth/auth-modal-wrapper";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner h-12 w-12"></div>
      </div>
    )
  }

  return (
    <AuthProvider>
      <AuthModalProvider>
        <ConfirmationProvider>
          <Navigation />
          <main className="relative z-10">{children}</main>
          <AIChatbot />
          <AuthModalWrapper />
        </ConfirmationProvider>
      </AuthModalProvider>
    </AuthProvider>
  );
}
