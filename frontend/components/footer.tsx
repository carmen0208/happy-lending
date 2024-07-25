import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { HeartIcon } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t w-full h-14 sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center sm:justify-between justify-center sm:gap-0 gap-4 h-full text-muted-foreground text-sm flex-wrap sm:py-0 py-3">
        <p className="text-center">
          Build by{" "}
          <Link className="px-1 underline underline-offset-2" href={siteConfig.author.github}>
            {siteConfig.author.name}
          </Link>
          . The source code is available on{" "}
          <Link className="px-1 underline underline-offset-2" href={siteConfig.links.github}>
            GitHub
          </Link>
          .
        </p>
        <div className="gap-4 items-center hidden sm:flex">
          <FooterButtons />
        </div>
      </div>
    </footer>
  );
}

export function FooterButtons() {
  return (
    <>
      <Link href={siteConfig.author.github} className={buttonVariants({ variant: "outline", size: "sm" })}>
        <HeartIcon fill="red" className="h-4 w-4 mr-2 text-red-500" />
        Sponsor
      </Link>
    </>
  );
}