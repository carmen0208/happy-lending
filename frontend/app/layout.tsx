import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { WalletProvider } from "@/components/wallet-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Ninja Hub",
  description: "A place for user to manage all their assets"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn("flex flex-col min-h-screen bg-background font-sans antialiased", fontSans.variable)}
        suppressHydrationWarning={true}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <WalletProvider>
            <SiteHeader />
            {children}
            <Footer />
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
