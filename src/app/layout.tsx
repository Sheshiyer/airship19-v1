import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { WalletProvider } from "../context/wallet-context";
import { AuthProvider } from "../context/auth-context";
import { NavWrapper } from "@/components/navigation/nav-wrapper";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Airship19 - Multi-Perspective Experience",
  description: "Experience reality through multiple lenses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-black antialiased">
        {/* Skip to main content link */}
        <a
          href="#main-content"
          className="skip-to-content"
          tabIndex={0}
        >
          Skip to main content
        </a>

        <AuthProvider>
          <WalletProvider>
            <NavWrapper />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
          </WalletProvider>
        </AuthProvider>

        {/* Keyboard navigation script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('keydown', (e) => {
                // ESC key closes modals
                if (e.key === 'Escape') {
                  document.dispatchEvent(new CustomEvent('closeModals'));
                }
                
                // Arrow keys for perspective navigation
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                  document.dispatchEvent(new CustomEvent('navigatePerspectives', {
                    detail: { direction: e.key === 'ArrowLeft' ? 'prev' : 'next' }
                  }));
                }

                // Tab key for focus trap in modals
                if (e.key === 'Tab') {
                  const modal = document.querySelector('[role="dialog"]');
                  if (modal) {
                    const focusableElements = modal.querySelectorAll(
                      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    const firstFocusable = focusableElements[0];
                    const lastFocusable = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey && document.activeElement === firstFocusable) {
                      e.preventDefault();
                      lastFocusable.focus();
                    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                      e.preventDefault();
                      firstFocusable.focus();
                    }
                  }
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
