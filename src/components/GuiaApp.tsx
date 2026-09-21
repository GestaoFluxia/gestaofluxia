"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Guia } from "@/content/types";
import { ChapterRenderer } from "./ChapterRenderer";

interface Progresso {
  capituloAtual: number;
  checklist: Record<string, Record<string, boolean>>;
}

export function GuiaApp({
  produtoSlug,
  guia,
  progressoInicial,
}: {
  produtoSlug: string;
  guia: Guia;
  progressoInicial: Progresso;
}) {
  const router = useRouter();
  const [progresso, setProgresso] = useState<Progresso>(progressoInicial);
  const [menuAberto, setMenuAberto] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function sair() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const capitulo = guia.capitulos[progresso.capituloAtual] ?? guia.capitulos[0];
  const percentual = Math.round(((progresso.capituloAtual + 1) / guia.capitulos.length) * 100);

  function salvar(novo: Progresso) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetch("/api/progresso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produtoSlug, ...novo }),
      }).catch(() => {
        // falha de rede pontual: o estado local continua correto, só não persistiu ainda
      });
    }, 500);
  }

  function irParaCapitulo(indice: number) {
    const novo = { ...progresso, capituloAtual: indice };
    setProgresso(novo);
    salvar(novo);
    setMenuAberto(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function alternarChecklistItem(checklistId: string, indice: number, valor: boolean) {
    const novo: Progresso = {
      ...progresso,
      checklist: {
        ...progresso.checklist,
        [checklistId]: {
          ...(progresso.checklist[checklistId] ?? {}),
          [String(indice)]: valor,
        },
      },
    };
    setProgresso(novo);
    salvar(novo);
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="sticky top-0 z-20 h-1 w-full bg-neutral-900">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${percentual}%` }}
        />
      </div>

      <header className="sticky top-1 z-10 flex items-center justify-between border-b border-neutral-800 bg-neutral-950/95 px-4 py-3 backdrop-blur sm:px-6">
        <button
          type="button"
          onClick={() => setMenuAberto((v) => !v)}
          className="rounded-md border border-neutral-800 px-3 py-1.5 text-sm text-neutral-300 lg:hidden"
        >
          Capítulos
        </button>
        <h1 className="truncate text-sm font-semibold text-neutral-400 sm:text-base">
          {guia.titulo}
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-500">{percentual}%</span>
          <button onClick={sair} className="text-xs text-neutral-500 hover:text-neutral-300">
            Sair
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-8 px-4 py-8 sm:px-6">
        <nav
          className={`${
            menuAberto ? "block" : "hidden"
          } fixed inset-0 z-30 overflow-y-auto bg-neutral-950 p-6 lg:sticky lg:top-20 lg:block lg:h-fit lg:w-64 lg:shrink-0 lg:bg-transparent lg:p-0`}
        >
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <span className="text-sm font-semibold text-neutral-400">Capítulos</span>
            <button onClick={() => setMenuAberto(false)} className="text-neutral-400">
              Fechar
            </button>
          </div>
          <ol className="space-y-1">
            {guia.capitulos.map((cap, i) => (
              <li key={cap.id}>
                <button
                  onClick={() => irParaCapitulo(i)}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
                    i === progresso.capituloAtual
                      ? "bg-emerald-500/10 font-medium text-emerald-400"
                      : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
                  }`}
                >
                  {i + 1}. {cap.titulo}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <main className="min-w-0 flex-1 pb-16">
          <ChapterRenderer
            capitulo={capitulo}
            checklistState={progresso.checklist}
            onToggleChecklist={alternarChecklistItem}
          />

          <div className="mt-10 flex items-center justify-between border-t border-neutral-800 pt-6">
            <button
              disabled={progresso.capituloAtual === 0}
              onClick={() => irParaCapitulo(progresso.capituloAtual - 1)}
              className="rounded-md border border-neutral-800 px-4 py-2 text-sm text-neutral-300 disabled:opacity-30"
            >
              ← Anterior
            </button>
            <button
              disabled={progresso.capituloAtual === guia.capitulos.length - 1}
              onClick={() => irParaCapitulo(progresso.capituloAtual + 1)}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-30"
            >
              Próximo →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
