import type { Guia } from "./types";
import { guiaRescisaoSemErro } from "./rescisao-sem-erro";
import { guiaKitFeriasEHorasExtras } from "./kit-ferias-13-horas-extras";
import { guiaScriptDesligamento } from "./script-desligamento";

export const GUIAS: Record<string, Guia> = {
  "rescisao-sem-erro": guiaRescisaoSemErro,
  "kit-ferias-13-horas-extras": guiaKitFeriasEHorasExtras,
  "script-desligamento": guiaScriptDesligamento,
};

export function guiaPorSlug(slug: string): Guia | undefined {
  return GUIAS[slug];
}
