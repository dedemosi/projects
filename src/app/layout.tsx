import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { SideNav } from "@/components/layout/side-nav";
import { GlobalHeader } from "@/components/layout/global-header";
import { ThemeProvider } from "@/components/theme-provider";
import { KeyboardShortcutsProvider } from "@/components/keyboard-shortcuts-provider";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catalyst - Prospecting Tool",
  description: "Benefit broker prospecting tool by Mployer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", geistSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={["light", "dark", "navy"]}
        >
          <KeyboardShortcutsProvider>
            <div className="flex h-screen w-full overflow-hidden">
              <Suspense fallback={<div className="w-12 border-r" />}>
                <SideNav />
              </Suspense>
              <div className="flex flex-col flex-1 overflow-hidden">
                <GlobalHeader />
                <main className="flex-1 overflow-hidden">
                  {children}
                </main>
              </div>
            </div>
          </KeyboardShortcutsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
