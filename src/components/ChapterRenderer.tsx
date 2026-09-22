import type { Capitulo } from "@/content/types";
import { BlocoCopiavel } from "./CopyButton";
import { Checklist } from "./Checklist";
import { ComparadorTipos } from "./ComparadorTipos";
import { RescisaoCalculadora } from "./calculadoras/RescisaoCalculadora";
import { FeriasCalculadora } from "./calculadoras/FeriasCalculadora";
import { DecimoTerceiroCalculadora } from "./calculadoras/DecimoTerceiroCalculadora";
import { HoraExtraCalculadora } from "./calculadoras/HoraExtraCalculadora";

const CALCULADORAS = {
  rescisao: RescisaoCalculadora,
  ferias: FeriasCalculadora,
  decimoTerceiro: DecimoTerceiroCalculadora,
  horaExtra: HoraExtraCalculadora,
};

export function ChapterRenderer({
  capitulo,
  checklistState,
  onToggleChecklist,
  onIrParaCapitulo,
}: {
  capitulo: Capitulo;
  checklistState: Record<string, Record<string, boolean>>;
  onToggleChecklist: (checklistId: string, indice: number, valor: boolean) => void;
  onIrParaCapitulo: (capituloId: string) => void;
}) {
  return (
    <article>
      <h2 className="mb-6 text-2xl font-bold text-neutral-50 sm:text-3xl">{capitulo.titulo}</h2>
      {capitulo.blocos.map((bloco, i) => {
        switch (bloco.tipo) {
          case "p":
            return (
              <p key={i} className="mb-4 text-[17px] leading-relaxed text-neutral-300">
                {bloco.texto}
              </p>
            );
          case "h3":
            return (
              <h3 key={i} className="mb-3 mt-8 text-xl font-semibold text-neutral-100">
                {bloco.texto}
              </h3>
            );
          case "lista":
            return (
              <ul key={i} className="mb-4 list-disc space-y-2 pl-6 text-[17px] text-neutral-300">
                {bloco.itens.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "template":
            return <BlocoCopiavel key={i} titulo={bloco.titulo} texto={bloco.texto} />;
          case "checklist":
            return (
              <Checklist
                key={i}
                itens={bloco.itens}
                marcados={checklistState[bloco.id] ?? {}}
                onToggle={(indice, valor) => onToggleChecklist(bloco.id, indice, valor)}
              />
            );
          case "calculadora": {
            const Calculadora = CALCULADORAS[bloco.ferramenta];
            return <Calculadora key={i} />;
          }
          case "comparador":
            return <ComparadorTipos key={i} />;
          case "conclusao":
            return (
              <div
                key={i}
                className="mt-10 rounded-xl border border-emerald-800/40 bg-gradient-to-br from-emerald-950/40 to-neutral-900/40 p-6"
              >
                <div className="mb-2 flex items-center gap-2 text-emerald-400">
                  <span className="text-xl">✓</span>
                  <h3 className="text-lg font-semibold text-neutral-50">{bloco.titulo}</h3>
                </div>
                <p className="mb-5 text-[15px] leading-relaxed text-neutral-300">{bloco.mensagem}</p>
                <div className="flex flex-wrap gap-3">
                  {bloco.acoes.map((acao, j) =>
                    acao.capituloId ? (
                      <button
                        key={j}
                        onClick={() => onIrParaCapitulo(acao.capituloId!)}
                        className="rounded-lg border border-emerald-700/60 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20"
                      >
                        {acao.label}
                      </button>
                    ) : (
                      <a
                        key={j}
                        href={acao.href}
                        className="rounded-lg border border-emerald-700/60 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20"
                      >
                        {acao.label}
                      </a>
                    )
                  )}
                </div>
              </div>
            );
          default:
            return null;
        }
      })}
    </article>
  );
}
