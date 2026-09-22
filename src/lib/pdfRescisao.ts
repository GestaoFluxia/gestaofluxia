import type { EntradaRescisao, ResultadoRescisao, TipoDesligamento } from "./calculos";
import { formatarMoeda } from "./formato";
import { gerarPdfCalculo, type DadosColaborador } from "./pdfCalculo";

const ROTULO_TIPO: Record<TipoDesligamento, string> = {
  sem_justa_causa: "Sem justa causa",
  pedido_demissao: "Pedido de demissão",
  acordo: "Acordo entre as partes (art. 484-A)",
  justa_causa: "Justa causa",
};

function dataBr(iso: string): string {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

export async function gerarPdfRescisao(
  colaborador: DadosColaborador,
  entrada: EntradaRescisao,
  resultado: ResultadoRescisao
) {
  return gerarPdfCalculo({
    titulo: "Simulação de Rescisão",
    prefixoArquivo: "rescisao",
    colaborador,
    secoes: [
      {
        titulo: "Dados do contrato",
        linhas: [
          { rotulo: "Salário base", valor: formatarMoeda(entrada.salario) },
          { rotulo: "Admissão", valor: dataBr(entrada.dataAdmissao) },
          { rotulo: "Desligamento", valor: dataBr(entrada.dataDesligamento) },
          { rotulo: "Tipo de desligamento", valor: ROTULO_TIPO[entrada.tipo] },
          { rotulo: "Dias trabalhados no mês", valor: String(entrada.diasTrabalhadosNoMes) },
          {
            rotulo: "Aviso prévio",
            valor:
              resultado.diasAvisoPrevio > 0
                ? `Indenizado (${resultado.diasAvisoPrevio} dias)`
                : "Trabalhado ou não devido",
          },
        ],
      },
      {
        titulo: "Verbas apuradas",
        linhas: [
          { rotulo: "Saldo de salário", valor: formatarMoeda(resultado.saldoSalario) },
          {
            rotulo: "Aviso prévio indenizado",
            valor: formatarMoeda(resultado.avisoPrevioIndenizado),
          },
          {
            rotulo: `Férias proporcionais (${resultado.mesesFerias}/12)`,
            valor: formatarMoeda(resultado.feriasProporcionais),
          },
          { rotulo: "1/3 constitucional de férias", valor: formatarMoeda(resultado.tercoFerias) },
          {
            rotulo: `13º proporcional (${resultado.meses13}/12)`,
            valor: formatarMoeda(resultado.decimoTerceiroProporcional),
          },
          {
            rotulo:
              resultado.percentualMultaFgts > 0
                ? `Multa do FGTS (${resultado.percentualMultaFgts * 100}%, estimada)`
                : "Multa do FGTS",
            valor: formatarMoeda(resultado.multaFgtsEstimada),
          },
        ],
      },
    ],
    total: { rotulo: "Total estimado", valor: resultado.total },
    aviso:
      "Documento de apoio gerado a partir dos dados informados nesta simulação. A multa do FGTS usa um depósito estimado de 8% ao mês sobre o salário informado — confirme o saldo real no extrato do FGTS. Esta simulação não substitui o TRCT oficial nem a conferência do seu contador.",
  });
}
