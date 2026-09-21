"use client";

import { useRouter } from "next/navigation";

export function LogoutLink() {
  const router = useRouter();

  async function sair() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button onClick={sair} className="text-sm text-neutral-500 hover:text-neutral-300">
      Sair
    </button>
  );
}
