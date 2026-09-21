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
      <p className="max-w-sm text-center text-sm text-neutral-300">
        Se esse e-mail tiver uma compra aprovada, você vai receber um novo acesso em instantes.
        Confira também a caixa de spam.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
      <div className="space-y-1">
        <label className="text-sm text-neutral-400" htmlFor="email">
          E-mail usado na compra
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100"
        />
      </div>
      <button
        type="submit"
        disabled={carregando}
        className="w-full rounded-md bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-500 disabled:opacity-60"
      >
        {carregando ? "Enviando..." : "Enviar novo acesso"}
      </button>
      <p className="text-center text-sm text-neutral-500">
        <a href="/login" className="text-emerald-400 hover:underline">
          Voltar pro login
        </a>
      </p>
    </form>
  );
}
