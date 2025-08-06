'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase'

interface AuthFormProps {
  view?: 'sign_in' | 'sign_up'
}

export default function AuthForm({ view = 'sign_in' }: AuthFormProps) {
  return (
    <div className="max-w-md mx-auto">
      <Auth
        supabaseClient={supabase}
        view={view}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#059669',
                brandAccent: '#047857',
                brandButtonText: 'white',
                defaultButtonBackground: 'rgba(255, 255, 255, 0.1)',
                defaultButtonBackgroundHover: 'rgba(255, 255, 255, 0.2)',
                defaultButtonBorder: 'rgba(255, 255, 255, 0.2)',
                defaultButtonText: 'rgba(255, 255, 255, 0.9)',
                dividerBackground: 'rgba(255, 255, 255, 0.2)',
                inputBackground: 'rgba(255, 255, 255, 0.1)',
                inputBorder: 'rgba(255, 255, 255, 0.2)',
                inputBorderHover: 'rgba(52, 211, 153, 0.5)',
                inputBorderFocus: 'rgba(52, 211, 153, 0.5)',
                inputText: 'rgba(255, 255, 255, 0.95)',
                inputLabelText: 'rgba(255, 255, 255, 0.9)',
                inputPlaceholder: 'rgba(255, 255, 255, 0.6)',
                messageText: 'rgba(255, 255, 255, 0.8)',
                messageTextDanger: 'rgb(248, 113, 113)',
                anchorTextColor: 'rgb(52, 211, 153)',
                anchorTextHoverColor: 'rgb(16, 185, 129)',
              },
              space: {
                spaceSmall: '4px',
                spaceMedium: '8px',
                spaceLarge: '16px',
                labelBottomMargin: '8px',
                anchorBottomMargin: '4px',
                emailInputSpacing: '4px',
                socialAuthSpacing: '4px',
                buttonPadding: '10px 15px',
                inputPadding: '10px 15px',
              },
              fontSizes: {
                baseBodySize: '14px',
                baseInputSize: '14px',
                baseLabelSize: '14px',
                baseButtonSize: '14px',
              },
              fonts: {
                bodyFontFamily: `'Inter', system-ui, sans-serif`,
                buttonFontFamily: `'Inter', system-ui, sans-serif`,
                inputFontFamily: `'Inter', system-ui, sans-serif`,
                labelFontFamily: `'Inter', system-ui, sans-serif`,
              },
              borderWidths: {
                buttonBorderWidth: '1px',
                inputBorderWidth: '1px',
              },
              radii: {
                borderRadiusButton: '12px',
                buttonBorderRadius: '12px',
                inputBorderRadius: '12px',
              },
            },
          },
          className: {
            anchor: 'text-emerald-400 hover:text-emerald-300 transition-colors',
            button: 'glass hover:bg-white/20 transition-all duration-300 transform hover:scale-105',
            container: 'space-y-4',
            divider: 'opacity-20',
            input: 'glass text-white placeholder-white/60 focus:ring-2 focus:ring-emerald-400/50',
            label: 'text-white/90 font-medium',
            loader: 'text-emerald-400',
            message: 'text-white/80 text-sm',
          },
        }}
        providers={[]}
        redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`}
      />
    </div>
  )
}
