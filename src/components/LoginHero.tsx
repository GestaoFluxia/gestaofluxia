"use client";

import { useEffect, useState } from "react";

const DESTAQUES = [
  {
    icone: "🧮",
    titulo: "Calcule a rescisão em 15 minutos",
    texto: "Digite salário e datas. O app soma cada verba na hora e exporta o PDF da simulação.",
  },
  {
    icone: "🗂️",
    titulo: "Tudo por capítulo, sem enrolação",
    texto: "Fórmulas, casos reais e checklists de execução — do jeito que se usa no dia a dia.",
  },
  {
    icone: "✅",
    titulo: "Seu progresso fica salvo",
    texto: "Fecha o navegador, volta amanhã e continua exatamente de onde parou.",
  },
];

export function LoginHero() {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndice((i) => (i + 1) % DESTAQUES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const destaque = DESTAQUES[indice];

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="mb-8 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-sm">
            ⚡
          </span>
          <span className="text-sm font-semibold tracking-tight text-neutral-200">
            Área de Membros
          </span>
        </div>

        <h1 className="text-2xl font-bold leading-snug text-neutral-50">
          Seus guias de RH,
          <br />
          prontos pra usar hoje.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">
          Nada de PDF parado no computador. Capítulos, calculadoras e checklists dentro de um app
          de verdade.
        </p>
      </div>

      <div>
        <div key={indice} className="animate-fade-up min-h-[104px]">
          <span className="text-2xl">{destaque.icone}</span>
          <h2 className="mt-2 font-semibold text-neutral-100">{destaque.titulo}</h2>
          <p className="mt-1 text-sm leading-relaxed text-neutral-400">{destaque.texto}</p>
        </div>

        <div className="mt-5 flex gap-1.5">
          {DESTAQUES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndice(i)}
              aria-label={`Ver destaque ${i + 1}`}
              className={`h-1 rounded-full transition-all ${
                i === indice ? "w-8 bg-emerald-500" : "w-4 bg-neutral-700 hover:bg-neutral-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
