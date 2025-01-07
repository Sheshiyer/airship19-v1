import "../styles/globals.css";
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Airship19 - Interactive Experience",
  description: "A modern, interactive landing page showcasing multiple perspectives",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning className="relative min-h-screen font-body antialiased bg-black text-white selection:bg-primary-500/90 selection:text-white">
        <div className="relative flex min-h-screen flex-col">
          <main className="relative flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
