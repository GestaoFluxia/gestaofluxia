export function formatarMoeda(valor: number): string {
  if (!Number.isFinite(valor)) return "R$ 0,00";
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
