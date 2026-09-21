"use client";

import { useState } from "react";

export function PrimeiroAcessoForm() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);
    try {
      await fetch("/api/auth/recuperar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } finally {
      setCarregando(false);
      setEnviado(true);
    }
  }

  if (enviado) {
    return (
      <div className="text-center">
        <span className="text-2xl">📬</span>
        <p className="mt-3 text-sm text-neutral-300">
          Se esse e-mail tiver uma compra aprovada, você vai receber um novo acesso em instantes.
          Confira também a caixa de spam.
        </p>
        <a href="/login" className="mt-4 inline-block text-sm font-medium text-emerald-400 hover:underline">
          Voltar pro login
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-neutral-300" htmlFor="email">
          E-mail usado na compra
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="voce@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-neutral-700 bg-neutral-950/60 px-4 py-2.5 text-neutral-100 placeholder-neutral-600 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/30"
        />
      </div>
      <button
        type="submit"
        disabled={carregando}
        className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-2.5 font-medium text-white shadow-lg shadow-emerald-950/40 transition hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
      >
        {carregando ? "Enviando..." : "Enviar novo acesso"}
      </button>
      <p className="text-center text-sm text-neutral-500">
        <a href="/login" className="font-medium text-emerald-400 hover:underline">
          Voltar pro login
        </a>
      </p>
    </form>
  );
}
