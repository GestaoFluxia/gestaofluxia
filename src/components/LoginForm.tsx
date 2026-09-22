"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
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
      router.push(data.redirect ?? "/");
      router.refresh();
    } catch {
      setErro("Falha de conexão. Tente de novo em instantes.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full space-y-5">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-neutral-300" htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          required
          autoFocus
          autoComplete="email"
          placeholder="voce@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-neutral-700 bg-neutral-950/60 px-4 py-2.5 text-neutral-100 placeholder-neutral-600 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/30"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-neutral-300" htmlFor="senha">
          Senha
        </label>
        <div className="relative">
          <input
            id="senha"
            type={mostrarSenha ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyUp={(e) => setCapsLock(e.getModifierState?.("CapsLock") ?? false)}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950/60 px-4 py-2.5 pr-20 text-neutral-100 placeholder-neutral-600 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/30"
          />
          <button
            type="button"
            onClick={() => setMostrarSenha((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-500 transition hover:text-emerald-400"
          >
            {mostrarSenha ? "Ocultar" : "Mostrar"}
          </button>
        </div>
        {capsLock && (
          <p className="text-xs text-amber-400">⚠ Caps Lock está ligado.</p>
        )}
      </div>

      {erro && (
        <p className="animate-fade-up rounded-lg border border-red-900/50 bg-red-950/30 px-3 py-2 text-sm text-red-400">
          {erro}
        </p>
      )}

      <button
        type="submit"
        disabled={carregando}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-2.5 font-medium text-white shadow-lg shadow-emerald-950/40 transition hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
      >
        {carregando && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        )}
        {carregando ? "Entrando..." : "Entrar →"}
      </button>

      <p className="text-center text-sm text-neutral-500">
        Comprou e não recebeu o acesso?{" "}
        <a href="/primeiro-acesso" className="font-medium text-emerald-400 hover:underline">
          Clique aqui
        </a>
      </p>
    </form>
  );
}
