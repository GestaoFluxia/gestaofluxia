// Fórmulas de referência de cálculo trabalhista (CLT). São estimativas
// pedagógicas para o leitor entender a conta — não substituem o cálculo
// oficial da folha nem orientação de um contador/advogado trabalhista.

function meses30(dataInicio: Date, dataFim: Date): number {
  const diffMs = dataFim.getTime() - dataInicio.getTime();
  const dias = diffMs / (1000 * 60 * 60 * 24);
  return dias / 30;
}

/** Meses trabalhados no ano corrente, arredondando pra cima a partir de 15 dias, teto 12. */
export function mesesProporcionais(dataInicioContagem: Date, dataFim: Date): number {
  const totalMeses = meses30(dataInicioContagem, dataFim);
  const mesesCheios = Math.floor(totalMeses);
  const diasRestantes = (totalMeses - mesesCheios) * 30;
  const meses = diasRestantes >= 15 ? mesesCheios + 1 : mesesCheios;
  return Math.min(Math.max(meses, 0), 12);
}

export interface ResultadoRescisao {
  saldoSalario: number;
  avisoPrevioIndenizado: number;
  diasAvisoPrevio: number;
  feriasProporcionais: number;
  tercoFerias: number;
  mesesFerias: number;
  decimoTerceiroProporcional: number;
  meses13: number;
  fgtsMesesEstimado: number;
  multaFgtsEstimada: number;
  percentualMultaFgts: number;
  total: number;
}

/** Lei 12.506/2011: 30 dias + 3 por ano completo de casa, teto de 90. */
export function diasAvisoPrevio(dataAdmissao: Date, dataDesligamento: Date): number {
  const anosCompletos = Math.floor(meses30(dataAdmissao, dataDesligamento) / 12);
  return Math.min(30 + 3 * Math.max(anosCompletos, 0), 90);
}

export type TipoDesligamento =
  | "sem_justa_causa"
  | "pedido_demissao"
  | "acordo"
  | "justa_causa";

export interface EntradaRescisao {
  salario: number;
  dataAdmissao: string; // yyyy-mm-dd
  dataDesligamento: string; // yyyy-mm-dd
  diasTrabalhadosNoMes: number; // dias do mês da rescisão já trabalhados
  tipo: TipoDesligamento;
  avisoPrevioIndenizado: boolean;
}

export function calcularRescisao(e: EntradaRescisao): ResultadoRescisao {
  const admissao = new Date(e.dataAdmissao);
  const desligamento = new Date(e.dataDesligamento);
  const valorDia = e.salario / 30;

  const saldoSalario = valorDia * e.diasTrabalhadosNoMes;

  const inicioAnoAquisitivo = new Date(
    desligamento.getFullYear(),
    admissao.getMonth(),
    admissao.getDate()
  );
  const inicioContagem =
    inicioAnoAquisitivo > desligamento
      ? new Date(inicioAnoAquisitivo.getFullYear() - 1, inicioAnoAquisitivo.getMonth(), inicioAnoAquisitivo.getDate())
      : inicioAnoAquisitivo;

  const mesesFerias = mesesProporcionais(inicioContagem, desligamento);
  const feriasProporcionais = (e.salario / 12) * mesesFerias;
  const tercoFerias = feriasProporcionais / 3;

  const inicioAno13 = new Date(desligamento.getFullYear(), 0, 1);
  const baseContagem13 = admissao > inicioAno13 ? admissao : inicioAno13;
  const meses13 = mesesProporcionais(baseContagem13, desligamento);
  const decimoTerceiroProporcional = (e.salario / 12) * meses13;

  const dias = diasAvisoPrevio(admissao, desligamento);
  // No acordo do art. 484-A o aviso indenizado é devido pela metade.
  const fatorAcordo = e.tipo === "acordo" ? 0.5 : 1;
  const avisoPrevioIndenizado = e.avisoPrevioIndenizado ? valorDia * dias * fatorAcordo : 0;

  const totalMesesTrabalhados = Math.max(1, Math.ceil(meses30(admissao, desligamento)));
  const fgtsMesesEstimado = e.salario * 0.08 * totalMesesTrabalhados;
  const temMulta = e.tipo === "sem_justa_causa" || e.tipo === "acordo";
  const percentualMulta = e.tipo === "acordo" ? 0.2 : 0.4;
  const multaFgtsEstimada = temMulta ? fgtsMesesEstimado * percentualMulta : 0;

  const total =
    saldoSalario +
    avisoPrevioIndenizado +
    feriasProporcionais +
    tercoFerias +
    decimoTerceiroProporcional +
    multaFgtsEstimada;

  return {
    saldoSalario,
    avisoPrevioIndenizado,
    diasAvisoPrevio: e.avisoPrevioIndenizado ? dias : 0,
    feriasProporcionais,
    tercoFerias,
    mesesFerias,
    decimoTerceiroProporcional,
    meses13,
    fgtsMesesEstimado,
    multaFgtsEstimada,
    percentualMultaFgts: temMulta ? percentualMulta : 0,
    total,
  };
}

export function calcularFerias(salario: number, mesesTrabalhados: number, comAbono: boolean) {
  const meses = Math.min(Math.max(mesesTrabalhados, 0), 12);
  const feriasProporcionais = (salario / 12) * meses;
  const tercoConstitucional = feriasProporcionais / 3;
  const abonoPecuniario = comAbono ? salario / 3 : 0;
  const tercoAbono = comAbono ? abonoPecuniario / 3 : 0;
  return {
    feriasProporcionais,
    tercoConstitucional,
    abonoPecuniario,
    tercoAbono,
    total: feriasProporcionais + tercoConstitucional + abonoPecuniario + tercoAbono,
  };
}

export function calcularDecimoTerceiro(salario: number, mesesTrabalhados: number) {
  const meses = Math.min(Math.max(mesesTrabalhados, 0), 12);
  const valor = (salario / 12) * meses;
  return {
    primeiraParcela: valor / 2,
    segundaParcela: valor / 2,
    total: valor,
  };
}

export function calcularHoraExtra(
  salario: number,
  horasMensaisBase: number,
  quantidadeHorasExtras: number,
  percentualAdicional: number // 50 ou 100
) {
  const valorHoraNormal = salario / horasMensaisBase;
  const valorHoraExtra = valorHoraNormal * (1 + percentualAdicional / 100);
  const totalHorasExtras = valorHoraExtra * quantidadeHorasExtras;
  // DSR sobre horas extras: proporção de dias de repouso sobre dias úteis do mês (estimativa com 5 dias úteis/1 DSR)
  const reflexoDsr = totalHorasExtras / 5;
  return {
    valorHoraNormal,
    valorHoraExtra,
    totalHorasExtras,
    reflexoDsr,
    total: totalHorasExtras + reflexoDsr,
  };
}
