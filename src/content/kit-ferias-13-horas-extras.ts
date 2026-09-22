import type { Guia } from "./types";

export const guiaKitFeriasEHorasExtras: Guia = {
  slug: "kit-ferias-13-horas-extras",
  titulo: "Kit Férias, 13º e Horas Extras",
  jornada: [
    {
      id: "entender-regras",
      fase: "teoria",
      titulo: "Entenda as regras de cada verba",
      descricao:
        "Período aquisitivo, abono pecuniário, parcelas do 13º e percentuais de hora extra — o que a lei exige em cada caso.",
      capituloIds: ["ferias", "decimo-terceiro", "hora-extra"],
    },
    {
      id: "banco-horas",
      fase: "teoria",
      titulo: "Banco de horas e adicional noturno",
      descricao:
        "Quando a compensação vale, qual o prazo pra compensar e como calcular a hora noturna reduzida.",
      capituloIds: ["banco-de-horas"],
    },
    {
      id: "praticar",
      fase: "pratica",
      titulo: "Calcule com as calculadoras do app",
      descricao:
        "Três calculadoras (férias, 13º e hora extra) e casos práticos já resolvidos pra conferir o seu resultado.",
      capituloIds: ["casos-praticos"],
    },
    {
      id: "rotina-mensal",
      fase: "pratica",
      titulo: "Monte sua rotina mensal de conferência",
      descricao:
        "Checklist que você reabre todo fechamento de folha pra pegar erro antes que ele vire passivo.",
      capituloIds: ["checklist-mensal"],
    },
  ],
  capitulos: [
    {
      id: "ferias",
      titulo: "Férias proporcionais, vencidas e abono pecuniário",
      blocos: [
        {
          tipo: "p",
          texto:
            "Fora da rescisão, férias têm uma regra mais simples: a cada 12 meses trabalhados (período aquisitivo), a pessoa tem direito a 30 dias de descanso, pagos com 1/3 a mais (o chamado 1/3 constitucional). A empresa tem os 12 meses seguintes (período concessivo) pra conceder esse descanso — passar disso gera férias em dobro.",
        },
        {
          tipo: "template",
          titulo: "Fórmula — Férias (período completo)",
          texto:
            "Férias = Salário + 1/3 do salário\n\nSe passou do período concessivo (12 meses após completar o direito):\nFérias em dobro = (Salário + 1/3) × 2",
        },
        {
          tipo: "h3",
          texto: "Abono pecuniário (venda de 1/3 das férias)",
        },
        {
          tipo: "p",
          texto:
            "O funcionário pode vender até 1/3 dos dias de férias (10 dos 30 dias) e continuar trabalhando nesse período. O pedido precisa ser feito até 15 dias antes do fim do período aquisitivo.",
        },
        {
          tipo: "template",
          titulo: "Fórmula — Abono pecuniário",
          texto: "Abono = (Salário ÷ 3) + 1/3 sobre o abono = (Salário ÷ 3) × 1,333...",
        },
        {
          tipo: "calculadora",
          ferramenta: "ferias",
        },
      ],
    },
    {
      id: "decimo-terceiro",
      titulo: "13º salário: proporcional, integral, 1ª e 2ª parcela",
      blocos: [
        {
          tipo: "p",
          texto:
            "Quem trabalhou o ano inteiro recebe o 13º integral (um salário cheio, dividido em duas parcelas). Quem foi admitido durante o ano recebe proporcional aos meses trabalhados. As datas de pagamento são fixas por lei: a 1ª parcela até 30 de novembro, a 2ª até 20 de dezembro.",
        },
        {
          tipo: "template",
          titulo: "Fórmula — 13º salário",
          texto:
            "13º integral = Salário\n13º proporcional = (Salário ÷ 12) × meses trabalhados no ano (fração ≥ 15 dias conta como mês cheio)\n\n1ª parcela = 13º ÷ 2 (sem descontos)\n2ª parcela = 13º ÷ 2 (com desconto de INSS e IRRF sobre o valor total do 13º)",
        },
        {
          tipo: "p",
          texto:
            "Um erro comum: calcular o 13º sobre o salário base e esquecer de incluir médias de comissões, horas extras habituais e adicionais (noturno, insalubridade, periculosidade) recebidos ao longo do ano — eles entram na base de cálculo.",
        },
        {
          tipo: "calculadora",
          ferramenta: "decimoTerceiro",
        },
      ],
    },
    {
      id: "hora-extra",
      titulo: "Hora extra: percentuais, base de cálculo e reflexos",
      blocos: [
        {
          tipo: "p",
          texto:
            "Toda hora trabalhada além da jornada contratual (normalmente 220 horas/mês, equivalente a 44h semanais) é hora extra. A CLT garante o adicional mínimo de 50% em dia útil, e 100% em domingos e feriados trabalhados sem folga compensatória. Esse é o piso — não necessariamente o que você deve pagar.",
        },
        {
          tipo: "h3",
          texto: "O percentual real vem da convenção coletiva",
        },
        {
          tipo: "p",
          texto:
            "A convenção coletiva (CCT) da categoria pode fixar percentuais maiores que o mínimo legal, e isso prevalece sobre a CLT. Pagar 50% quando a CCT manda pagar 80% gera diferença salarial com reflexo em DSR, férias, 13º e FGTS — um passivo que se acumula silenciosamente mês a mês.",
        },
        {
          tipo: "lista",
          itens: [
            "50% — piso legal da CLT para dia útil",
            "60%, 70%, 80% e 90% — percentuais comuns em convenções coletivas de várias categorias",
            "100% — domingos e feriados pela CLT, e também percentual de CCT em algumas categorias",
            "120% — aparece em convenções mais favoráveis, normalmente para horas noturnas ou excedentes a um limite diário",
          ],
        },
        {
          tipo: "p",
          texto:
            "Antes de fechar a folha, abra a CCT vigente da categoria e confirme o percentual. A calculadora abaixo aceita todos esses valores — é só selecionar o que a sua convenção determina.",
        },
        {
          tipo: "template",
          titulo: "Fórmula — Hora extra",
          texto:
            "Valor da hora normal = Salário ÷ Horas mensais contratadas\nValor da hora extra = Valor da hora normal × (1 + adicional%)\nTotal do mês = Valor da hora extra × quantidade de horas extras",
        },
        {
          tipo: "h3",
          texto: "Reflexo no DSR (Descanso Semanal Remunerado)",
        },
        {
          tipo: "p",
          texto:
            "Quem recebe hora extra com habitualidade também recebe reflexo proporcional no DSR — o repouso semanal remunerado é calculado sobre a média do que a pessoa ganhou no mês, incluindo as horas extras. Ignorar esse reflexo é uma das causas mais comuns de reclamação trabalhista por diferença salarial.",
        },
        {
          tipo: "calculadora",
          ferramenta: "horaExtra",
        },
      ],
    },
    {
      id: "banco-de-horas",
      titulo: "Banco de horas e adicional noturno",
      blocos: [
        {
          tipo: "p",
          texto:
            "Banco de horas é o acordo (individual ou coletivo) pra compensar horas extras com folga, em vez de pagar em dinheiro. Sem acordo formal por escrito, a compensação não vale — e a Justiça do Trabalho trata como hora extra normal, com todos os adicionais e reflexos.",
        },
        {
          tipo: "lista",
          itens: [
            "Acordo individual escrito: compensação precisa acontecer em até 6 meses",
            "Acordo coletivo (convenção/acordo sindical): pode ir até 12 meses, conforme a norma da categoria",
            "Se o contrato terminar antes da compensação, as horas acumuladas viram hora extra a pagar na rescisão",
          ],
        },
        {
          tipo: "h3",
          texto: "Adicional noturno",
        },
        {
          tipo: "p",
          texto:
            "Trabalho entre 22h e 5h tem adicional mínimo de 20% sobre a hora diurna, e a \"hora noturna\" nesse período é reduzida (dura 52 minutos e 30 segundos, mas é paga como se fosse uma hora cheia). Isso faz o valor da hora noturna trabalhada ser maior que o simples adicional de 20% sugere à primeira vista.",
        },
        {
          tipo: "template",
          titulo: "Fórmula — Adicional noturno",
          texto:
            "Valor da hora noturna = Valor da hora normal × 1,20\nHoras noturnas trabalhadas (equivalente): horas corridas ÷ (52,5 ÷ 60)",
        },
      ],
    },
    {
      id: "casos-praticos",
      titulo: "Casos práticos calculados",
      blocos: [
        {
          tipo: "template",
          titulo: "Caso 1 — Férias com venda de 1/3",
          texto:
            "Salário: R$ 2.400,00, período completo, com abono\n\nFérias: R$ 2.400,00 + 1/3 (R$ 800,00) = R$ 3.200,00\nAbono: (2400 ÷ 3) + 1/3 sobre o abono = R$ 800,00 + R$ 266,67 = R$ 1.066,67\nTotal a receber: R$ 4.266,67",
        },
        {
          tipo: "template",
          titulo: "Caso 2 — 13º proporcional (admitido em maio)",
          texto:
            "Salário: R$ 2.800,00, 8 meses trabalhados no ano (maio a dezembro)\n\n13º proporcional: (2800 ÷ 12) × 8 = R$ 1.866,67\n1ª parcela (novembro): R$ 933,33\n2ª parcela (dezembro, com descontos): R$ 933,33 menos INSS/IRRF sobre o total",
        },
        {
          tipo: "template",
          titulo: "Caso 3 — 10 horas extras a 50%",
          texto:
            "Salário: R$ 2.200,00, 220h contratadas, 10h extras a 50%\n\nValor da hora normal: 2200 ÷ 220 = R$ 10,00\nValor da hora extra: 10 × 1,5 = R$ 15,00\nTotal do mês: 15 × 10 = R$ 150,00\nReflexo estimado no DSR: 150 ÷ 5 = R$ 30,00",
        },
      ],
    },
    {
      id: "checklist-mensal",
      titulo: "Checklist mensal de conferência da folha",
      blocos: [
        {
          tipo: "p",
          texto:
            "Use esta lista todo mês antes de fechar a folha — ela pega os erros mais comuns antes que virem passivo trabalhista.",
        },
        {
          tipo: "checklist",
          id: "checklist-conferencia-mensal",
          itens: [
            "Conferir se todas as horas extras do ponto foram lançadas na folha",
            "Verificar se o adicional noturno foi aplicado a quem bateu ponto entre 22h e 5h",
            "Checar se há acordo de banco de horas por escrito antes de compensar em vez de pagar",
            "Confirmar se comissões e adicionais habituais entraram na base de cálculo de DSR",
            "Verificar quem completa período aquisitivo de férias neste mês",
            "Conferir quem está no período concessivo perto de vencer (risco de férias em dobro)",
            "Revisar admissões do ano pra saber quem entra na provisão de 13º proporcional",
            "Guardar comprovante de pagamento de tudo dentro do prazo legal",
          ],
        },
        {
          tipo: "conclusao",
          titulo: "Guia concluído — próximo passo",
          mensagem:
            "Salve este checklist nos favoritos: é ele que você vai reabrir todo fechamento de folha. Se ainda não calculou uma rescisão, o próximo guia natural é este:",
          acoes: [
            { label: "Abrir o guia Rescisão Sem Erro", href: "/p/rescisao-sem-erro" },
            { label: "Voltar ao painel de guias", href: "/" },
          ],
        },
      ],
    },
  ],
};
