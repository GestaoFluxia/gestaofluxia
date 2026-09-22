"use client";

import { useState } from "react";
import { calcularHoraExtra } from "@/lib/calculos";
import { formatarMoeda } from "@/lib/formato";
import { gerarPdfCalculo } from "@/lib/pdfCalculo";
import {
  BotaoExportarPdf,
  CamposColaborador,
  classeInput,
  useColaborador,
} from "./CamposColaborador";

// A CLT garante o mínimo de 50%. A convenção coletiva da categoria pode
// fixar percentuais maiores — por isso a lista vai até 120%.
const PERCENTUAIS = [
  { valor: "50", rotulo: "50% — mínimo legal (dia útil)" },
  { valor: "60", rotulo: "60% — conforme CCT" },
  { valor: "70", rotulo: "70% — conforme CCT" },
  { valor: "80", rotulo: "80% — conforme CCT" },
  { valor: "90", rotulo: "90% — conforme CCT" },
  { valor: "100", rotulo: "100% — domingos e feriados / CCT" },
  { valor: "120", rotulo: "120% — conforme CCT" },
];

export function HoraExtraCalculadora() {
  const { colaborador, atualizar } = useColaborador();
  const [salario, setSalario] = useState("3000");
  const [horasBase, setHorasBase] = useState("220");
  const [horasExtras, setHorasExtras] = useState("10");
  const [percentual, setPercentual] = useState("50");
  const [gerandoPdf, setGerandoPdf] = useState(false);

  const salarioNum = Number(salario.replace(",", "."));
  const horasBaseNum = Number(horasBase);
  const horasExtrasNum = Number(horasExtras.replace(",", "."));
  const percentualNum = Number(percentual);
  const valido = salarioNum > 0 && horasBaseNum > 0 && horasExtrasNum >= 0;
  const resultado = valido
    ? calcularHoraExtra(salarioNum, horasBaseNum, horasExtrasNum, percentualNum)
    : null;

  async function exportarPdf() {
    if (!resultado) return;
    setGerandoPdf(true);
    try {
      await gerarPdfCalculo({
        titulo: "Cálculo de Hora Extra",
        prefixoArquivo: "hora-extra",
        colaborador,
        secoes: [
          {
            titulo: "Dados do cálculo",
            linhas: [
              { rotulo: "Salário base", valor: formatarMoeda(salarioNum) },
              { rotulo: "Jornada mensal contratada", valor: `${horasBaseNum} horas` },
              { rotulo: "Horas extras no mês", valor: `${horasExtrasNum} horas` },
              { rotulo: "Adicional aplicado", valor: `${percentualNum}%` },
            ],
          },
          {
            titulo: "Apuração",
            linhas: [
              {
                rotulo: "Valor da hora normal",
                valor: formatarMoeda(resultado.valorHoraNormal),
              },
              {
                rotulo: `Valor da hora extra (+${percentualNum}%)`,
                valor: formatarMoeda(resultado.valorHoraExtra),
              },
              {
                rotulo: "Total de horas extras",
                valor: formatarMoeda(resultado.totalHorasExtras),
              },
              { rotulo: "Reflexo estimado no DSR", valor: formatarMoeda(resultado.reflexoDsr) },
            ],
          },
        ],
        total: { rotulo: "Total", valor: resultado.total },
        aviso:
          "Documento de apoio gerado a partir dos dados informados. O adicional de hora extra mínimo é de 50% pela CLT, mas a convenção coletiva da categoria pode fixar percentual maior — confirme a CCT aplicável. O reflexo no DSR é estimado com base em 5 dias úteis por repouso; a proporção real depende da escala e da convenção.",
      });
    } finally {
      setGerandoPdf(false);
    }
  }

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50">
      <div className="border-b border-neutral-800 bg-neutral-900/80 px-5 py-4">
        <h4 className="text-base font-semibold text-neutral-50">Calculadora de hora extra</h4>
        <p className="mt-0.5 text-xs text-neutral-500">
          Identifique o colaborador, escolha o adicional da CCT e exporte o cálculo em PDF.
        </p>
      </div>

      <div className="space-y-6 p-5">
        <CamposColaborador colaborador={colaborador} atualizar={atualizar} />

        <fieldset className="space-y-3">
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-500/80">
            Dados do cálculo
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-neutral-300">
              Salário (R$)
              <input
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
                inputMode="decimal"
                className={classeInput}
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-neutral-300">
              Jornada mensal contratada (horas)
              <input
                value={horasBase}
                onChange={(e) => setHorasBase(e.target.value)}
                inputMode="numeric"
                className={classeInput}
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-neutral-300">
              Horas extras no mês
              <input
                value={horasExtras}
                onChange={(e) => setHorasExtras(e.target.value)}
                inputMode="decimal"
                className={classeInput}
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-neutral-300">
              Adicional de hora extra
              <select
                value={percentual}
                onChange={(e) => setPercentual(e.target.value)}
                className={classeInput}
              >
                {PERCENTUAIS.map((p) => (
                  <option key={p.valor} value={p.valor}>
                    {p.rotulo}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="text-xs text-neutral-500">
            A CLT garante no mínimo 50%. Acima disso, o percentual vem da convenção coletiva da
            categoria — confira a CCT antes de fechar a folha.
          </p>
        </fieldset>

        {!valido && (
          <p className="rounded-lg border border-amber-900/50 bg-amber-950/20 px-3 py-2 text-sm text-amber-400">
            Confira os valores informados.
          </p>
        )}

        {resultado && (
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
            <div className="space-y-1.5 text-sm text-neutral-300">
              <Linha nome="Valor da hora normal" valor={resultado.valorHoraNormal} />
              <Linha
                nome={`Valor da hora extra (+${percentualNum}%)`}
                valor={resultado.valorHoraExtra}
              />
              <Linha nome="Total de horas extras" valor={resultado.totalHorasExtras} />
              <Linha nome="Reflexo estimado no DSR" valor={resultado.reflexoDsr} />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-neutral-800 pt-4 text-lg font-semibold text-neutral-50">
              <span>Total</span>
              <span className="text-emerald-400">{formatarMoeda(resultado.total)}</span>
            </div>

            <BotaoExportarPdf
              onClick={exportarPdf}
              desabilitado={!colaborador.nome.trim()}
              gerando={gerandoPdf}
            />

            <p className="mt-4 text-xs text-neutral-500">
              Reflexo no DSR estimado com base em 5 dias úteis por repouso — a proporção real
              depende da escala e da convenção coletiva da categoria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Linha({ nome, valor }: { nome: string; valor: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span>{nome}</span>
      <span className="tabular-nums text-neutral-100">{formatarMoeda(valor)}</span>
    </div>
  );
}
