"use client";

import { useState } from "react";
import { calcularDecimoTerceiro } from "@/lib/calculos";
import { formatarMoeda } from "@/lib/formato";
import { gerarPdfCalculo } from "@/lib/pdfCalculo";
import {
  BotaoExportarPdf,
  CamposColaborador,
  classeInput,
  useColaborador,
} from "./CamposColaborador";

export function DecimoTerceiroCalculadora() {
  const { colaborador, atualizar } = useColaborador();
  const [salario, setSalario] = useState("3000");
  const [meses, setMeses] = useState("12");
  const [gerandoPdf, setGerandoPdf] = useState(false);

  const salarioNum = Number(salario.replace(",", "."));
  const mesesNum = Number(meses);
  const valido = salarioNum > 0 && mesesNum >= 0 && mesesNum <= 12;
  const resultado = valido ? calcularDecimoTerceiro(salarioNum, mesesNum) : null;

  async function exportarPdf() {
    if (!resultado) return;
    setGerandoPdf(true);
    try {
      await gerarPdfCalculo({
        titulo: "Cálculo de 13º Salário",
        prefixoArquivo: "decimo-terceiro",
        colaborador,
        secoes: [
          {
            titulo: "Dados do cálculo",
            linhas: [
              { rotulo: "Salário base", valor: formatarMoeda(salarioNum) },
              { rotulo: "Meses trabalhados no ano", valor: `${mesesNum}/12` },
            ],
          },
          {
            titulo: "Parcelas",
            linhas: [
              {
                rotulo: "1ª parcela (até 30/11, sem descontos)",
                valor: formatarMoeda(resultado.primeiraParcela),
              },
              {
                rotulo: "2ª parcela (até 20/12, com INSS e IRRF)",
                valor: formatarMoeda(resultado.segundaParcela),
              },
            ],
          },
        ],
        total: { rotulo: "Total bruto", valor: resultado.total },
        aviso:
          "Documento de apoio gerado a partir dos dados informados. Valor bruto: os descontos de INSS e IRRF incidem sobre o total e são retidos na segunda parcela. Médias de comissões, horas extras habituais e adicionais entram na base de cálculo e não estão incluídas aqui.",
      });
    } finally {
      setGerandoPdf(false);
    }
  }

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50">
      <div className="border-b border-neutral-800 bg-neutral-900/80 px-5 py-4">
        <h4 className="text-base font-semibold text-neutral-50">Calculadora de 13º salário</h4>
        <p className="mt-0.5 text-xs text-neutral-500">
          Identifique o colaborador, informe os dados e exporte o cálculo em PDF.
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
              Meses trabalhados no ano (0-12)
              <input
                value={meses}
                onChange={(e) => setMeses(e.target.value)}
                inputMode="numeric"
                className={classeInput}
              />
            </label>
          </div>
        </fieldset>

        {!valido && (
          <p className="rounded-lg border border-amber-900/50 bg-amber-950/20 px-3 py-2 text-sm text-amber-400">
            Informe um salário válido e de 0 a 12 meses.
          </p>
        )}

        {resultado && (
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
            <div className="space-y-1.5 text-sm text-neutral-300">
              <Linha nome="1ª parcela (até 30/11)" valor={resultado.primeiraParcela} />
              <Linha nome="2ª parcela (até 20/12)" valor={resultado.segundaParcela} />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-neutral-800 pt-4 text-lg font-semibold text-neutral-50">
              <span>Total bruto</span>
              <span className="text-emerald-400">{formatarMoeda(resultado.total)}</span>
            </div>

            <BotaoExportarPdf
              onClick={exportarPdf}
              desabilitado={!colaborador.nome.trim()}
              gerando={gerandoPdf}
            />

            <p className="mt-4 text-xs text-neutral-500">
              Valor bruto. INSS e IRRF incidem sobre o total e são retidos na segunda parcela.
              Médias de comissões, horas extras habituais e adicionais entram na base e não estão
              incluídas aqui.
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
