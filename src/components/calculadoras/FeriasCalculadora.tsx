"use client";

import { useState } from "react";
import { calcularFerias } from "@/lib/calculos";
import { formatarMoeda } from "@/lib/formato";
import { gerarPdfCalculo } from "@/lib/pdfCalculo";
import {
  BotaoExportarPdf,
  CamposColaborador,
  classeInput,
  useColaborador,
} from "./CamposColaborador";

export function FeriasCalculadora() {
  const { colaborador, atualizar } = useColaborador();
  const [salario, setSalario] = useState("3000");
  const [meses, setMeses] = useState("12");
  const [comAbono, setComAbono] = useState(false);
  const [gerandoPdf, setGerandoPdf] = useState(false);

  const salarioNum = Number(salario.replace(",", "."));
  const mesesNum = Number(meses);
  const valido = salarioNum > 0 && mesesNum >= 0 && mesesNum <= 12;
  const resultado = valido ? calcularFerias(salarioNum, mesesNum, comAbono) : null;

  async function exportarPdf() {
    if (!resultado) return;
    setGerandoPdf(true);
    try {
      await gerarPdfCalculo({
        titulo: "Cálculo de Férias",
        prefixoArquivo: "ferias",
        colaborador,
        secoes: [
          {
            titulo: "Dados do cálculo",
            linhas: [
              { rotulo: "Salário base", valor: formatarMoeda(salarioNum) },
              { rotulo: "Meses no período aquisitivo", valor: `${mesesNum}/12` },
              { rotulo: "Abono pecuniário (venda de 1/3)", valor: comAbono ? "Sim" : "Não" },
            ],
          },
          {
            titulo: "Verbas apuradas",
            linhas: [
              {
                rotulo: "Férias proporcionais",
                valor: formatarMoeda(resultado.feriasProporcionais),
              },
              { rotulo: "1/3 constitucional", valor: formatarMoeda(resultado.tercoConstitucional) },
              ...(comAbono
                ? [
                    {
                      rotulo: "Abono pecuniário",
                      valor: formatarMoeda(resultado.abonoPecuniario),
                    },
                    { rotulo: "1/3 sobre o abono", valor: formatarMoeda(resultado.tercoAbono) },
                  ]
                : []),
            ],
          },
        ],
        total: { rotulo: "Total", valor: resultado.total },
        aviso:
          "Documento de apoio gerado a partir dos dados informados. Valores brutos, antes de INSS e IRRF. Confira a convenção coletiva da categoria, que pode trazer condições mais favoráveis.",
      });
    } finally {
      setGerandoPdf(false);
    }
  }

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50">
      <div className="border-b border-neutral-800 bg-neutral-900/80 px-5 py-4">
        <h4 className="text-base font-semibold text-neutral-50">Calculadora de férias</h4>
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
              Meses no período aquisitivo (0-12)
              <input
                value={meses}
                onChange={(e) => setMeses(e.target.value)}
                inputMode="numeric"
                className={classeInput}
              />
            </label>

            <label className="flex items-center gap-2 text-sm text-neutral-300">
              <input
                type="checkbox"
                checked={comAbono}
                onChange={(e) => setComAbono(e.target.checked)}
                className="h-4 w-4 accent-emerald-500"
              />
              Vender 1/3 das férias (abono pecuniário)
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
              <Linha nome="Férias proporcionais" valor={resultado.feriasProporcionais} />
              <Linha nome="1/3 constitucional" valor={resultado.tercoConstitucional} />
              {comAbono && (
                <Linha nome="Abono pecuniário (venda de 1/3)" valor={resultado.abonoPecuniario} />
              )}
              {comAbono && <Linha nome="1/3 sobre o abono" valor={resultado.tercoAbono} />}
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
              Valores brutos, antes de INSS e IRRF. A convenção coletiva da categoria pode trazer
              condições mais favoráveis.
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
