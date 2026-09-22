import { formatarMoeda } from "./formato";

export interface DadosColaborador {
  nome: string;
  cargo: string;
  matricula: string;
  empresa: string;
}

export interface SecaoPdf {
  titulo: string;
  linhas: { rotulo: string; valor: string }[];
}

function nomeArquivo(prefixo: string, nome: string): string {
  const limpo = nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  const hoje = new Date().toISOString().slice(0, 10);
  return `${prefixo}-${limpo || "colaborador"}-${hoje}.pdf`;
}

export async function gerarPdfCalculo(opts: {
  titulo: string;
  prefixoArquivo: string;
  colaborador: DadosColaborador;
  secoes: SecaoPdf[];
  total: { rotulo: string; valor: number };
  aviso: string;
}) {
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
  doc.text(opts.titulo, margem, 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const agora = new Date();
  doc.text(
    `Gerado em ${agora.toLocaleDateString("pt-BR")} às ${agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`,
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
  }

  function linha(rotulo: string, valor: string, destaque = false) {
    doc.setFont("helvetica", destaque ? "bold" : "normal");
    doc.setFontSize(10);
    doc.text(rotulo, margem, y);
    doc.text(valor, margem + larguraUtil, y, { align: "right" });
    y += 6.5;
  }

  secao("Colaborador");
  linha("Nome", opts.colaborador.nome || "-");
  if (opts.colaborador.cargo) linha("Cargo", opts.colaborador.cargo);
  if (opts.colaborador.matricula) linha("Matrícula / CPF", opts.colaborador.matricula);
  if (opts.colaborador.empresa) linha("Empresa", opts.colaborador.empresa);

  for (const s of opts.secoes) {
    y += 4;
    secao(s.titulo);
    for (const l of s.linhas) linha(l.rotulo, l.valor);
  }

  y += 3;
  doc.setFillColor(240, 248, 245);
  doc.rect(margem, y - 1, larguraUtil, 12, "F");
  y += 7;
  doc.setTextColor(16, 75, 58);
  linha(opts.total.rotulo.toUpperCase(), formatarMoeda(opts.total.valor), true);
  doc.setTextColor(30, 30, 30);

  y += 8;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(110, 110, 110);
  doc.text(doc.splitTextToSize(opts.aviso, larguraUtil), y > 250 ? margem : margem, y);

  doc.setFontSize(7.5);
  doc.setTextColor(150, 150, 150);
  doc.text("Gerado na sua área de membros — Gestão FluxIA", margem, 285);

  doc.save(nomeArquivo(opts.prefixoArquivo, opts.colaborador.nome));
}
