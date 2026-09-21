"use client";

import { useState } from "react";

export function CopyButton({ texto }: { texto: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    } catch {
      // clipboard indisponível (ex.: contexto não seguro); sem ação silenciosa quebrando a UI
    }
  }

  return (
    <button
      type="button"
      onClick={copiar}
      className="rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-sm font-medium text-neutral-100 transition hover:bg-neutral-700 active:scale-95"
    >
      {copiado ? "Copiado ✓" : "Copiar"}
    </button>
  );
}

export function BlocoCopiavel({ titulo, texto }: { titulo?: string; texto: string }) {
  return (
    <div className="my-4 rounded-lg border border-neutral-800 bg-neutral-900/60 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        {titulo && <span className="text-sm font-semibold text-neutral-400">{titulo}</span>}
        <CopyButton texto={texto} />
      </div>
      <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed text-neutral-200">
        {texto}
      </pre>
    </div>
  );
}
