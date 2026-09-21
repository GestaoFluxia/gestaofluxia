"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErro(data.erro ?? "Não foi possível entrar.");
        return;
      }
      router.push(data.redirect ?? "/login");
      router.refresh();
    } catch {
      setErro("Falha de conexão. Tente de novo em instantes.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
      <div className="space-y-1">
        <label className="text-sm text-neutral-400" htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm text-neutral-400" htmlFor="senha">
          Senha
        </label>
        <input
          id="senha"
          type="password"
          required
          autoComplete="current-password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100"
        />
      </div>

      {erro && <p className="text-sm text-red-400">{erro}</p>}

      <button
        type="submit"
        disabled={carregando}
        className="w-full rounded-md bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-500 disabled:opacity-60"
      >
        {carregando ? "Entrando..." : "Entrar"}
      </button>

      <p className="text-center text-sm text-neutral-500">
        Comprou e não recebeu o acesso?{" "}
        <a href="/primeiro-acesso" className="text-emerald-400 hover:underline">
          Clique aqui
        </a>
      </p>
    </form>
  );
}
