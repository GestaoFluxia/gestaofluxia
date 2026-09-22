import type { EntradaRescisao, ResultadoRescisao, TipoDesligamento } from "./calculos";
import { formatarMoeda } from "./formato";

export interface DadosColaborador {
  nome: string;
  cargo: string;
  matricula: string;
  empresa: string;
}

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

function nomeArquivo(nome: string): string {
  const limpo = nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  const hoje = new Date().toISOString().slice(0, 10);
  return `rescisao-${limpo || "colaborador"}-${hoje}.pdf`;
}

export async function gerarPdfRescisao(
  colaborador: DadosColaborador,
  entrada: EntradaRescisao,
  resultado: ResultadoRescisao
) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const margem = 18;
  const larguraUtil = 210 - margem * 2;
  let y = margem;

  doc.setFillColor(16, 45, 38);
  doc.rect(0, 0, 210, 32, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.text("Simulação de Rescisão", margem, 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    `Gerado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`,
    margem,
    23
  );

  y = 46;
  doc.setTextColor(30, 30, 30);

  function secao(titulo: string) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(titulo.toUpperCase(), margem, y);
    y += 2;
    doc.setDrawColor(16, 145, 105);
    doc.setLineWidth(0.6);
    doc.line(margem, y, margem + larguraUtil, y);
    y += 7;
    doc.setLineWidth(0.2);
    doc.setDrawColor(210, 210, 210);
  }

  function linha(rotulo: string, valor: string, destaque = false) {
    doc.setFont("helvetica", destaque ? "bold" : "normal");
    doc.setFontSize(10);
    doc.text(rotulo, margem, y);
    doc.text(valor, margem + larguraUtil, y, { align: "right" });
    y += 6.5;
  }

  secao("Colaborador");
  linha("Nome", colaborador.nome || "-");
  if (colaborador.cargo) linha("Cargo", colaborador.cargo);
  if (colaborador.matricula) linha("Matrícula / CPF", colaborador.matricula);
  if (colaborador.empresa) linha("Empresa", colaborador.empresa);

  y += 4;
  secao("Dados do contrato");
  linha("Salário base", formatarMoeda(entrada.salario));
  linha("Admissão", dataBr(entrada.dataAdmissao));
  linha("Desligamento", dataBr(entrada.dataDesligamento));
  linha("Tipo de desligamento", ROTULO_TIPO[entrada.tipo]);
  linha("Dias trabalhados no mês", String(entrada.diasTrabalhadosNoMes));
  linha(
    "Aviso prévio",
    resultado.diasAvisoPrevio > 0
      ? `Indenizado (${resultado.diasAvisoPrevio} dias)`
      : "Trabalhado ou não devido"
  );

  y += 4;
  secao("Verbas apuradas");
  linha("Saldo de salário", formatarMoeda(resultado.saldoSalario));
  linha("Aviso prévio indenizado", formatarMoeda(resultado.avisoPrevioIndenizado));
  linha(
    `Férias proporcionais (${resultado.mesesFerias}/12)`,
    formatarMoeda(resultado.feriasProporcionais)
  );
  linha("1/3 constitucional de férias", formatarMoeda(resultado.tercoFerias));
  linha(
    `13º proporcional (${resultado.meses13}/12)`,
    formatarMoeda(resultado.decimoTerceiroProporcional)
  );
  linha(
    resultado.percentualMultaFgts > 0
      ? `Multa do FGTS (${resultado.percentualMultaFgts * 100}%, estimada)`
      : "Multa do FGTS",
    formatarMoeda(resultado.multaFgtsEstimada)
  );

  y += 3;
  doc.setFillColor(240, 248, 245);
  doc.rect(margem, y - 1, larguraUtil, 12, "F");
  y += 7;
  doc.setTextColor(16, 75, 58);
  linha("TOTAL ESTIMADO", formatarMoeda(resultado.total), true);
  doc.setTextColor(30, 30, 30);

  y += 8;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(110, 110, 110);
  const aviso = doc.splitTextToSize(
    "Documento de apoio gerado a partir dos dados informados nesta simulação. A multa do FGTS usa um depósito estimado de 8% ao mês sobre o salário informado — confirme o saldo real no extrato do FGTS. Esta simulação não substitui o TRCT oficial nem a conferência do seu contador.",
    larguraUtil
  );
  doc.text(aviso, margem, y);

  doc.setFontSize(7.5);
  doc.setTextColor(150, 150, 150);
  doc.text("Gerado no app Rescisão Sem Erro", margem, 285);

  doc.save(nomeArquivo(colaborador.nome));
}
