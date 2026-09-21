"use client";

import { useState } from "react";
import { calcularRescisao, type TipoDesligamento } from "@/lib/calculos";
import { formatarMoeda } from "@/lib/formato";

const hoje = new Date().toISOString().slice(0, 10);

export function RescisaoCalculadora() {
  const [salario, setSalario] = useState("3000");
  const [dataAdmissao, setDataAdmissao] = useState("2024-03-01");
  const [dataDesligamento, setDataDesligamento] = useState(hoje);
  const [diasTrabalhadosNoMes, setDiasTrabalhadosNoMes] = useState("15");
  const [tipo, setTipo] = useState<TipoDesligamento>("sem_justa_causa");
  const [avisoIndenizado, setAvisoIndenizado] = useState(true);

  const salarioNum = Number(salario.replace(",", "."));
  const diasNum = Number(diasTrabalhadosNoMes);

  const valido =
    salarioNum > 0 &&
    diasNum >= 0 &&
    diasNum <= 30 &&
    !!dataAdmissao &&
    !!dataDesligamento &&
    new Date(dataDesligamento) >= new Date(dataAdmissao);

  const resultado = valido
    ? calcularRescisao({
        salario: salarioNum,
        dataAdmissao,
        dataDesligamento,
        diasTrabalhadosNoMes: diasNum,
        tipo,
        avisoPrevioIndenizado: tipo !== "justa_causa" && avisoIndenizado,
      })
    : null;

  return (
    <div className="my-6 rounded-xl border border-neutral-800 bg-neutral-900/60 p-5">
      <h4 className="mb-4 text-base font-semibold text-neutral-100">
        Calculadora de rescisão
      </h4>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-neutral-300">
          Salário (R$)
          <input
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            inputMode="decimal"
            className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-neutral-300">
          Tipo de desligamento
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoDesligamento)}
            className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100"
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
            className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-neutral-300">
          Data de desligamento
          <input
            type="date"
            value={dataDesligamento}
            onChange={(e) => setDataDesligamento(e.target.value)}
            className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-neutral-300">
          Dias trabalhados no mês do desligamento
          <input
            value={diasTrabalhadosNoMes}
            onChange={(e) => setDiasTrabalhadosNoMes(e.target.value)}
            inputMode="numeric"
            className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100"
          />
        </label>

        {tipo !== "justa_causa" && (
          <label className="flex items-center gap-2 text-sm text-neutral-300 sm:mt-6">
            <input
              type="checkbox"
              checked={avisoIndenizado}
              onChange={(e) => setAvisoIndenizado(e.target.checked)}
              className="h-4 w-4"
            />
            Aviso prévio indenizado (não cumprido)
          </label>
        )}
      </div>

      {!valido && (
        <p className="mt-4 text-sm text-amber-400">
          Confira as datas e o salário — a data de desligamento precisa ser igual ou depois da admissão.
        </p>
      )}

      {resultado && (
        <div className="mt-5 space-y-1 border-t border-neutral-800 pt-4 text-sm text-neutral-300">
          <Linha nome="Saldo de salário" valor={resultado.saldoSalario} />
          <Linha nome="Aviso prévio indenizado" valor={resultado.avisoPrevioIndenizado} />
          <Linha nome="Férias proporcionais" valor={resultado.feriasProporcionais} />
          <Linha nome="1/3 de férias" valor={resultado.tercoFerias} />
          <Linha nome="13º proporcional" valor={resultado.decimoTerceiroProporcional} />
          <Linha nome="Multa do FGTS (estimada)" valor={resultado.multaFgtsEstimada} />
          <div className="mt-3 flex items-center justify-between border-t border-neutral-800 pt-3 text-base font-semibold text-neutral-100">
            <span>Total estimado</span>
            <span>{formatarMoeda(resultado.total)}</span>
          </div>
          <p className="pt-2 text-xs text-neutral-500">
            Estimativa educacional baseada no salário informado. A multa do FGTS usa um depósito
            estimado de 8% ao mês — confira o extrato real do FGTS pra fechar o valor exato.
          </p>
        </div>
      )}
    </div>
  );
}

function Linha({ nome, valor }: { nome: string; valor: number }) {
  return (
    <div className="flex items-center justify-between">
      <span>{nome}</span>
      <span className="text-neutral-100">{formatarMoeda(valor)}</span>
    </div>
  );
}
