"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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

  const ultimoIndice = guia.capitulos.length - 1;
  const capitulo = guia.capitulos[progresso.capituloAtual] ?? guia.capitulos[0];
  const percentual = Math.round(((progresso.capituloAtual + 1) / guia.capitulos.length) * 100);
  const noUltimoCapitulo = progresso.capituloAtual === ultimoIndice;

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

  function irParaCapituloPorId(id: string) {
    const indice = guia.capitulos.findIndex((c) => c.id === id);
    if (indice >= 0) irParaCapitulo(indice);
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
      <div className="sticky top-0 z-20 h-[3px] w-full bg-neutral-900">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 ease-out"
          style={{ width: `${percentual}%` }}
        />
      </div>

      <header className="sticky top-[3px] z-10 flex items-center justify-between border-b border-neutral-800/80 bg-neutral-950/90 px-4 py-3 backdrop-blur sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuAberto((v) => !v)}
            className="rounded-md border border-neutral-800 px-3 py-1.5 text-sm text-neutral-300 lg:hidden"
          >
            ☰
          </button>
          <Link
            href="/"
            className="hidden text-sm text-neutral-500 transition hover:text-neutral-300 sm:block"
          >
            ← Painel
          </Link>
          <span className="hidden text-neutral-700 sm:block">/</span>
          <h1 className="truncate text-sm font-semibold text-neutral-200 sm:text-base">
            {guia.titulo}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 sm:flex">
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-neutral-800">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${percentual}%` }}
              />
            </div>
            <span className="text-xs tabular-nums text-neutral-500">{percentual}%</span>
          </div>
          <button onClick={sair} className="text-xs text-neutral-500 hover:text-neutral-300">
            Sair
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-8 px-4 py-8 sm:px-6">
        <nav
          className={`${
            menuAberto ? "block" : "hidden"
          } fixed inset-0 z-30 overflow-y-auto bg-neutral-950 p-6 lg:sticky lg:top-20 lg:block lg:h-fit lg:w-72 lg:shrink-0 lg:bg-transparent lg:p-0`}
        >
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <span className="text-sm font-semibold text-neutral-400">Capítulos</span>
            <button onClick={() => setMenuAberto(false)} className="text-neutral-400">
              Fechar
            </button>
          </div>
          <ol className="relative space-y-0.5">
            {guia.capitulos.map((cap, i) => {
              const concluido = i < progresso.capituloAtual;
              const ativo = i === progresso.capituloAtual;
              return (
                <li key={cap.id} className="relative flex gap-3 pb-1">
                  {i < guia.capitulos.length - 1 && (
                    <span
                      className={`absolute left-[11px] top-6 h-full w-px ${
                        concluido ? "bg-emerald-600/60" : "bg-neutral-800"
                      }`}
                    />
                  )}
                  <span
                    className={`z-10 mt-1.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${
                      concluido
                        ? "bg-emerald-500 text-neutral-950"
                        : ativo
                          ? "border-2 border-emerald-500 text-emerald-400"
                          : "border border-neutral-700 text-neutral-500"
                    }`}
                  >
                    {concluido ? "✓" : i + 1}
                  </span>
                  <button
                    onClick={() => irParaCapitulo(i)}
                    className={`flex-1 rounded-md px-2 py-1.5 text-left text-sm transition ${
                      ativo
                        ? "font-medium text-emerald-400"
                        : concluido
                          ? "text-neutral-400 hover:text-neutral-200"
                          : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    {cap.titulo}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <main className="min-w-0 flex-1 pb-16">
          <div className="mb-4 text-xs font-medium uppercase tracking-wider text-emerald-500/80">
            Capítulo {progresso.capituloAtual + 1} de {guia.capitulos.length}
          </div>

          <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/30 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:p-8">
            <ChapterRenderer
              capitulo={capitulo}
              checklistState={progresso.checklist}
              onToggleChecklist={alternarChecklistItem}
              onIrParaCapitulo={irParaCapituloPorId}
            />
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              disabled={progresso.capituloAtual === 0}
              onClick={() => irParaCapitulo(progresso.capituloAtual - 1)}
              className="rounded-lg border border-neutral-800 px-4 py-2.5 text-sm text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-900 disabled:pointer-events-none disabled:opacity-0"
            >
              ← Anterior
            </button>
            {!noUltimoCapitulo && (
              <button
                onClick={() => irParaCapitulo(progresso.capituloAtual + 1)}
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-emerald-950/50 transition hover:bg-emerald-500 active:scale-[0.98]"
              >
                Próximo →
              </button>
            )}
            {noUltimoCapitulo && (
              <Link
                href="/"
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-emerald-950/50 transition hover:bg-emerald-500 active:scale-[0.98]"
              >
                Voltar ao painel ✓
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
