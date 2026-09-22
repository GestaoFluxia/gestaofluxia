"use client";

import { useState } from "react";
import { calcularRescisao, type EntradaRescisao, type TipoDesligamento } from "@/lib/calculos";
import { formatarMoeda } from "@/lib/formato";
import { gerarPdfRescisao } from "@/lib/pdfRescisao";
import {
  BotaoExportarPdf,
  CamposColaborador,
  classeInput,
  useColaborador,
} from "./CamposColaborador";

const hoje = new Date().toISOString().slice(0, 10);

export function RescisaoCalculadora() {
  const { colaborador, atualizar } = useColaborador();
  const [salario, setSalario] = useState("3000");
  const [dataAdmissao, setDataAdmissao] = useState("2024-03-01");
  const [dataDesligamento, setDataDesligamento] = useState(hoje);
  const [diasTrabalhadosNoMes, setDiasTrabalhadosNoMes] = useState("15");
  const [tipo, setTipo] = useState<TipoDesligamento>("sem_justa_causa");
  const [avisoIndenizado, setAvisoIndenizado] = useState(true);
  const [gerandoPdf, setGerandoPdf] = useState(false);

  const salarioNum = Number(salario.replace(",", "."));
  const diasNum = Number(diasTrabalhadosNoMes);

  const valido =
    salarioNum > 0 &&
    diasNum >= 0 &&
    diasNum <= 30 &&
    !!dataAdmissao &&
    !!dataDesligamento &&
    new Date(dataDesligamento) >= new Date(dataAdmissao);

  const entrada: EntradaRescisao = {
    salario: salarioNum,
    dataAdmissao,
    dataDesligamento,
    diasTrabalhadosNoMes: diasNum,
    tipo,
    avisoPrevioIndenizado: tipo !== "justa_causa" && avisoIndenizado,
  };

  const resultado = valido ? calcularRescisao(entrada) : null;

  async function exportarPdf() {
    if (!resultado) return;
    setGerandoPdf(true);
    try {
      await gerarPdfRescisao(colaborador, entrada, resultado);
    } finally {
      setGerandoPdf(false);
    }
  }

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50">
      <div className="border-b border-neutral-800 bg-neutral-900/80 px-5 py-4">
        <h4 className="text-base font-semibold text-neutral-50">Simulador de rescisão</h4>
        <p className="mt-0.5 text-xs text-neutral-500">
          Identifique o colaborador, preencha os dados do contrato e exporte o resultado em PDF.
        </p>
      </div>

      <div className="space-y-6 p-5">
        <CamposColaborador colaborador={colaborador} atualizar={atualizar} />

        <fieldset className="space-y-3">
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-500/80">
            Dados do contrato
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
              Tipo de desligamento
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoDesligamento)}
                className={classeInput}
              >
                <option value="sem_justa_causa">Sem justa causa</option>
                <option value="pedido_demissao">Pedido de demissão</option>
                <option value="acordo">Acordo (art. 484-A)</option>
                <option value="justa_causa">Justa causa</option>
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm text-neutral-300">
              Data de admissão
              <input
                type="date"
                value={dataAdmissao}
                onChange={(e) => setDataAdmissao(e.target.value)}
                className={classeInput}
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-neutral-300">
              Data de desligamento
              <input
                type="date"
                value={dataDesligamento}
                onChange={(e) => setDataDesligamento(e.target.value)}
                className={classeInput}
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-neutral-300">
              Dias trabalhados no mês do desligamento
              <input
                value={diasTrabalhadosNoMes}
                onChange={(e) => setDiasTrabalhadosNoMes(e.target.value)}
                inputMode="numeric"
                className={classeInput}
              />
            </label>

            {tipo !== "justa_causa" && (
              <label className="flex items-center gap-2 text-sm text-neutral-300 sm:mt-7">
                <input
                  type="checkbox"
                  checked={avisoIndenizado}
                  onChange={(e) => setAvisoIndenizado(e.target.checked)}
                  className="h-4 w-4 accent-emerald-500"
                />
                Aviso prévio indenizado (não cumprido)
              </label>
            )}
          </div>
        </fieldset>

        {!valido && (
          <p className="rounded-lg border border-amber-900/50 bg-amber-950/20 px-3 py-2 text-sm text-amber-400">
            Confira as datas e o salário — a data de desligamento precisa ser igual ou depois da
            admissão.
          </p>
        )}

        {resultado && (
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
            <div className="space-y-1.5 text-sm text-neutral-300">
              <Linha nome="Saldo de salário" valor={resultado.saldoSalario} />
              <Linha
                nome={
                  resultado.diasAvisoPrevio > 0
                    ? `Aviso prévio indenizado (${resultado.diasAvisoPrevio} dias)`
                    : "Aviso prévio indenizado"
                }
                valor={resultado.avisoPrevioIndenizado}
              />
              <Linha
                nome={`Férias proporcionais (${resultado.mesesFerias}/12)`}
                valor={resultado.feriasProporcionais}
              />
              <Linha nome="1/3 de férias" valor={resultado.tercoFerias} />
              <Linha
                nome={`13º proporcional (${resultado.meses13}/12)`}
                valor={resultado.decimoTerceiroProporcional}
              />
              <Linha
                nome={
                  resultado.percentualMultaFgts > 0
                    ? `Multa do FGTS (${resultado.percentualMultaFgts * 100}%, estimada)`
                    : "Multa do FGTS"
                }
                valor={resultado.multaFgtsEstimada}
              />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-neutral-800 pt-4 text-lg font-semibold text-neutral-50">
              <span>Total estimado</span>
              <span className="text-emerald-400">{formatarMoeda(resultado.total)}</span>
            </div>

            <BotaoExportarPdf
              onClick={exportarPdf}
              desabilitado={!colaborador.nome.trim()}
              gerando={gerandoPdf}
            />

            <p className="mt-4 text-xs text-neutral-500">
              Estimativa educacional baseada no salário informado. A multa do FGTS usa um depósito
              estimado de 8% ao mês — confira o extrato real do FGTS pra fechar o valor exato.
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
