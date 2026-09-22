"use client";

import { useState } from "react";

type TipoId = "sem_justa_causa" | "pedido_demissao" | "acordo" | "justa_causa";

interface TipoInfo {
  id: TipoId;
  nome: string;
  quandoUsar: string;
  direitos: { verba: string; status: "sim" | "nao" | "parcial"; detalhe?: string }[];
}

const TIPOS: TipoInfo[] = [
  {
    id: "sem_justa_causa",
    nome: "Sem justa causa",
    quandoUsar:
      "A empresa decide encerrar o contrato sem que haja falta grave do empregado. É o desligamento mais comum e o mais caro para a empresa.",
    direitos: [
      { verba: "Saldo de salário", status: "sim" },
      { verba: "Aviso prévio", status: "sim", detalhe: "30 dias + 3 por ano, até 90" },
      { verba: "Férias vencidas + 1/3", status: "sim" },
      { verba: "Férias proporcionais + 1/3", status: "sim" },
      { verba: "13º proporcional", status: "sim" },
      { verba: "Multa do FGTS", status: "sim", detalhe: "40% do saldo" },
      { verba: "Saque do FGTS", status: "sim", detalhe: "Integral" },
      { verba: "Seguro-desemprego", status: "sim", detalhe: "Se cumprir os requisitos" },
    ],
  },
  {
    id: "pedido_demissao",
    nome: "Pedido de demissão",
    quandoUsar:
      "O próprio empregado decide sair. Ele deve avisar a empresa com 30 dias de antecedência, ou a empresa pode descontar o valor equivalente.",
    direitos: [
      { verba: "Saldo de salário", status: "sim" },
      { verba: "Aviso prévio", status: "parcial", detalhe: "Deve ser cumprido pelo empregado" },
      { verba: "Férias vencidas + 1/3", status: "sim" },
      { verba: "Férias proporcionais + 1/3", status: "sim" },
      { verba: "13º proporcional", status: "sim" },
      { verba: "Multa do FGTS", status: "nao" },
      { verba: "Saque do FGTS", status: "nao", detalhe: "Fica retido" },
      { verba: "Seguro-desemprego", status: "nao" },
    ],
  },
  {
    id: "acordo",
    nome: "Acordo (art. 484-A)",
    quandoUsar:
      "As duas partes concordam em encerrar o contrato. Criado pela Reforma de 2017, evita o \"acordo de boca\" ilegal em que se simulava uma demissão sem justa causa.",
    direitos: [
      { verba: "Saldo de salário", status: "sim" },
      { verba: "Aviso prévio", status: "parcial", detalhe: "Metade, se indenizado" },
      { verba: "Férias vencidas + 1/3", status: "sim" },
      { verba: "Férias proporcionais + 1/3", status: "sim", detalhe: "Integrais" },
      { verba: "13º proporcional", status: "sim", detalhe: "Integral" },
      { verba: "Multa do FGTS", status: "parcial", detalhe: "20% do saldo" },
      { verba: "Saque do FGTS", status: "parcial", detalhe: "Até 80% do saldo" },
      { verba: "Seguro-desemprego", status: "nao" },
    ],
  },
  {
    id: "justa_causa",
    nome: "Justa causa",
    quandoUsar:
      "Falta grave prevista em lei (art. 482 da CLT), com prova documental e, em regra, histórico de advertências. É a de maior risco jurídico: aplicada errado, costuma ser revertida na Justiça.",
    direitos: [
      { verba: "Saldo de salário", status: "sim" },
      { verba: "Aviso prévio", status: "nao" },
      { verba: "Férias vencidas + 1/3", status: "sim", detalhe: "Se houver período completo" },
      { verba: "Férias proporcionais + 1/3", status: "nao" },
      { verba: "13º proporcional", status: "nao" },
      { verba: "Multa do FGTS", status: "nao" },
      { verba: "Saque do FGTS", status: "nao", detalhe: "Fica retido" },
      { verba: "Seguro-desemprego", status: "nao" },
    ],
  },
];

const ESTILO_STATUS = {
  sim: { icone: "✓", classe: "text-emerald-400", fundo: "bg-emerald-500/10" },
  parcial: { icone: "≈", classe: "text-amber-400", fundo: "bg-amber-500/10" },
  nao: { icone: "✕", classe: "text-neutral-600", fundo: "bg-neutral-800/50" },
};

export function ComparadorTipos() {
  const [selecionado, setSelecionado] = useState<TipoId>("sem_justa_causa");
  const tipo = TIPOS.find((t) => t.id === selecionado)!;

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50">
      <div className="border-b border-neutral-800 bg-neutral-900/80 px-5 py-4">
        <h4 className="text-base font-semibold text-neutral-50">
          Comparador de tipos de rescisão
        </h4>
        <p className="mt-0.5 text-xs text-neutral-500">
          Toque em um tipo pra ver quando ele se aplica e o que o colaborador recebe.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-neutral-800 p-4">
        {TIPOS.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelecionado(t.id)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              t.id === selecionado
                ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-600/50"
                : "bg-neutral-800/60 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
            }`}
          >
            {t.nome}
          </button>
        ))}
      </div>

      <div className="p-5">
        <div className="mb-5 rounded-xl border border-neutral-800 bg-neutral-950/50 p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500/80">
            Quando se aplica
          </span>
          <p className="mt-2 text-[15px] leading-relaxed text-neutral-300">{tipo.quandoUsar}</p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {tipo.direitos.map((d) => {
            const estilo = ESTILO_STATUS[d.status];
            return (
              <div
                key={d.verba}
                className={`flex items-start gap-3 rounded-lg ${estilo.fundo} px-3 py-2.5`}
              >
                <span className={`mt-0.5 text-sm font-bold ${estilo.classe}`}>{estilo.icone}</span>
                <div className="min-w-0">
                  <div
                    className={`text-sm ${d.status === "nao" ? "text-neutral-500" : "text-neutral-200"}`}
                  >
                    {d.verba}
                  </div>
                  {d.detalhe && (
                    <div className="mt-0.5 text-xs text-neutral-500">{d.detalhe}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
