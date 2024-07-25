"use client";

import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { MetaMaskButton } from "@metamask/sdk-react-ui";
import { ConnectKitButton } from "connectkit";
import { useTheme } from "next-themes";

export function SiteHeader() {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">

          </div>
          <nav className="flex items-center">
            <div className="p-2">
            <MetaMaskButton theme={theme  as "light" | "dark"} color={theme === "light" ? "white": "blue"}></MetaMaskButton>
            </div>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}