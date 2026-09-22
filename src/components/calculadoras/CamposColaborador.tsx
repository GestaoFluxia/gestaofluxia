"use client";

import { useEffect, useState } from "react";
import type { DadosColaborador } from "@/lib/pdfCalculo";

const CHAVE = "colaborador-simulacao";

const VAZIO: DadosColaborador = { nome: "", cargo: "", matricula: "", empresa: "" };

/**
 * Guarda o colaborador da simulação no navegador pra não reescrever o nome
 * em cada calculadora. É conveniência local: nunca sai deste dispositivo.
 */
export function useColaborador() {
  const [colaborador, setColaborador] = useState<DadosColaborador>(VAZIO);

  useEffect(() => {
    try {
      const salvo = localStorage.getItem(CHAVE);
      if (salvo) setColaborador({ ...VAZIO, ...JSON.parse(salvo) });
    } catch {
      // storage bloqueado ou conteúdo inválido: segue com os campos em branco
    }
  }, []);

  function atualizar(campo: keyof DadosColaborador, valor: string) {
    setColaborador((atual) => {
      const novo = { ...atual, [campo]: valor };
      try {
        localStorage.setItem(CHAVE, JSON.stringify(novo));
      } catch {
        // sem persistência: o valor continua válido nesta sessão
      }
      return novo;
    });
  }

  return { colaborador, atualizar };
}

const classeInput =
  "rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/25";

export function CamposColaborador({
  colaborador,
  atualizar,
}: {
  colaborador: DadosColaborador;
  atualizar: (campo: keyof DadosColaborador, valor: string) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-500/80">
        Colaborador
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-neutral-300">
          Nome do colaborador
          <input
            value={colaborador.nome}
            onChange={(e) => atualizar("nome", e.target.value)}
            placeholder="Ex.: Maria da Silva"
            className={classeInput}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-neutral-300">
          Cargo <span className="text-neutral-600">(opcional)</span>
          <input
            value={colaborador.cargo}
            onChange={(e) => atualizar("cargo", e.target.value)}
            placeholder="Ex.: Auxiliar administrativo"
            className={classeInput}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-neutral-300">
          Matrícula ou CPF <span className="text-neutral-600">(opcional)</span>
          <input
            value={colaborador.matricula}
            onChange={(e) => atualizar("matricula", e.target.value)}
            className={classeInput}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-neutral-300">
          Empresa <span className="text-neutral-600">(opcional)</span>
          <input
            value={colaborador.empresa}
            onChange={(e) => atualizar("empresa", e.target.value)}
            className={classeInput}
          />
        </label>
      </div>
    </fieldset>
  );
}

export function BotaoExportarPdf({
  onClick,
  desabilitado,
  gerando,
}: {
  onClick: () => void;
  desabilitado: boolean;
  gerando: boolean;
}) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={onClick}
        disabled={desabilitado || gerando}
        className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-emerald-950/40 transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {gerando ? "Gerando..." : "⬇ Exportar PDF do cálculo"}
      </button>
      {desabilitado && (
        <span className="text-xs text-neutral-500">
          Informe o nome do colaborador pra liberar a exportação.
        </span>
      )}
    </div>
  );
}

export { classeInput };
