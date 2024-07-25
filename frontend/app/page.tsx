"use server";

import { Assets } from "@/components/assets";

export default async function Home() {
  return (
    <main className="flex-grow">
      <div className="p-4 block mx-auto max-w-screen-lg">
      <Assets />
      </div>
    </main>
  );
}
