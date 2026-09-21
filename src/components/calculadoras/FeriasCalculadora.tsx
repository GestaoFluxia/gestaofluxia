"use client";

import { useState } from "react";
import { calcularFerias } from "@/lib/calculos";
import { formatarMoeda } from "@/lib/formato";

export function FeriasCalculadora() {
  const [salario, setSalario] = useState("3000");
  const [meses, setMeses] = useState("12");
  const [comAbono, setComAbono] = useState(false);

  const salarioNum = Number(salario.replace(",", "."));
  const mesesNum = Number(meses);
  const valido = salarioNum > 0 && mesesNum >= 0 && mesesNum <= 12;
  const resultado = valido ? calcularFerias(salarioNum, mesesNum, comAbono) : null;

  return (
    <div className="my-6 rounded-xl border border-neutral-800 bg-neutral-900/60 p-5">
      <h4 className="mb-4 text-base font-semibold text-neutral-100">Calculadora de férias</h4>

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
          Meses trabalhados no período aquisitivo (0-12)
          <input
            value={meses}
            onChange={(e) => setMeses(e.target.value)}
            inputMode="numeric"
            className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100"
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-neutral-300">
          <input
            type="checkbox"
            checked={comAbono}
            onChange={(e) => setComAbono(e.target.checked)}
            className="h-4 w-4"
          />
          Vender 1/3 das férias (abono pecuniário)
        </label>
      </div>

      {!valido && (
        <p className="mt-4 text-sm text-amber-400">Informe um salário válido e de 0 a 12 meses.</p>
      )}

      {resultado && (
        <div className="mt-5 space-y-1 border-t border-neutral-800 pt-4 text-sm text-neutral-300">
          <Linha nome="Férias proporcionais" valor={resultado.feriasProporcionais} />
          <Linha nome="1/3 constitucional" valor={resultado.tercoConstitucional} />
          {comAbono && <Linha nome="Abono pecuniário (venda de 1/3)" valor={resultado.abonoPecuniario} />}
          {comAbono && <Linha nome="1/3 sobre o abono" valor={resultado.tercoAbono} />}
          <div className="mt-3 flex items-center justify-between border-t border-neutral-800 pt-3 text-base font-semibold text-neutral-100">
            <span>Total</span>
            <span>{formatarMoeda(resultado.total)}</span>
          </div>
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
