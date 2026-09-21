export type ProdutoSlug =
  | "rescisao-sem-erro"
  | "kit-ferias-13-horas-extras"
  | "script-desligamento";

export interface Produto {
  slug: ProdutoSlug;
  caktoProductId: string;
  nome: string;
  nomeCurto: string;
  icone: string;
  resumo: string;
}

export const PRODUTOS: Produto[] = [
  {
    slug: "rescisao-sem-erro",
    caktoProductId: "8ee9d747-0aac-46aa-bef0-b0c52128c2b7",
    nome: "Rescisão Sem Erro: Calcule Certo em 15 Minutos",
    nomeCurto: "Rescisão Sem Erro",
    icone: "🧮",
    resumo: "Calcule qualquer rescisão certinha, com calculadora interativa embutida.",
  },
  {
    slug: "kit-ferias-13-horas-extras",
    caktoProductId: "97e4df00-4884-447e-9049-382826b9631b",
    nome: "Kit Férias, 13º e Horas Extras: Calcule Tudo Certo",
    nomeCurto: "Kit Férias, 13º e Horas Extras",
    icone: "🗂️",
    resumo: "Férias, 13º e hora extra calculados sem decorar fórmula.",
  },
  {
    slug: "script-desligamento",
    caktoProductId: "828ce9df-c1c6-4733-bd9a-f4671d39d296",
    nome: "Script de Conversa de Desligamento Sem Climão",
    nomeCurto: "Script de Desligamento",
    icone: "💬",
    resumo: "Roteiro pronto pra conduzir qualquer desligamento com segurança.",
  },
];

export function produtoPorCaktoId(caktoProductId: string): Produto | undefined {
  return PRODUTOS.find((p) => p.caktoProductId === caktoProductId);
}

export function produtoPorSlug(slug: string): Produto | undefined {
  return PRODUTOS.find((p) => p.slug === slug);
}
