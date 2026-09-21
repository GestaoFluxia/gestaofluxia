import type { Capitulo } from "@/content/types";
import { BlocoCopiavel } from "./CopyButton";
import { Checklist } from "./Checklist";
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
}: {
  capitulo: Capitulo;
  checklistState: Record<string, Record<string, boolean>>;
  onToggleChecklist: (checklistId: string, indice: number, valor: boolean) => void;
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
          default:
            return null;
        }
      })}
    </article>
  );
}
