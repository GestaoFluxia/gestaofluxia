"use client";

import { useState } from "react";
import { calcularHoraExtra } from "@/lib/calculos";
import { formatarMoeda } from "@/lib/formato";

export function HoraExtraCalculadora() {
  const [salario, setSalario] = useState("3000");
  const [horasBase, setHorasBase] = useState("220");
  const [horasExtras, setHorasExtras] = useState("10");
  const [percentual, setPercentual] = useState("50");

  const salarioNum = Number(salario.replace(",", "."));
  const horasBaseNum = Number(horasBase);
  const horasExtrasNum = Number(horasExtras);
  const percentualNum = Number(percentual);
  const valido = salarioNum > 0 && horasBaseNum > 0 && horasExtrasNum >= 0;
  const resultado = valido
    ? calcularHoraExtra(salarioNum, horasBaseNum, horasExtrasNum, percentualNum)
    : null;

  return (
    <div className="my-6 rounded-xl border border-neutral-800 bg-neutral-900/60 p-5">
      <h4 className="mb-4 text-base font-semibold text-neutral-100">Calculadora de hora extra</h4>

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
          Horas mensais contratadas
          <input
            value={horasBase}
            onChange={(e) => setHorasBase(e.target.value)}
            inputMode="numeric"
            className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-neutral-300">
          Horas extras no mês
          <input
            value={horasExtras}
            onChange={(e) => setHorasExtras(e.target.value)}
            inputMode="numeric"
            className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-neutral-300">
          Adicional
          <select
            value={percentual}
            onChange={(e) => setPercentual(e.target.value)}
            className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100"
          >
            <option value="50">50% (dias úteis)</option>
            <option value="100">100% (domingos/feriados)</option>
          </select>
        </label>
      </div>

      {!valido && <p className="mt-4 text-sm text-amber-400">Confira os valores informados.</p>}

      {resultado && (
        <div className="mt-5 space-y-1 border-t border-neutral-800 pt-4 text-sm text-neutral-300">
          <Linha nome="Valor da hora normal" valor={resultado.valorHoraNormal} />
          <Linha nome="Valor da hora extra" valor={resultado.valorHoraExtra} />
          <Linha nome="Total de horas extras" valor={resultado.totalHorasExtras} />
          <Linha nome="Reflexo estimado no DSR" valor={resultado.reflexoDsr} />
          <div className="mt-3 flex items-center justify-between border-t border-neutral-800 pt-3 text-base font-semibold text-neutral-100">
            <span>Total</span>
            <span>{formatarMoeda(resultado.total)}</span>
          </div>
          <p className="pt-2 text-xs text-neutral-500">
            Reflexo no DSR estimado com base em 5 dias úteis por repouso — confira a convenção
            coletiva da categoria, que pode mudar essa proporção.
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
