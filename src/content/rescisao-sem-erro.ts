import type { Guia } from "./types";

export const guiaRescisaoSemErro: Guia = {
  slug: "rescisao-sem-erro",
  titulo: "Rescisão Sem Erro",
  capitulos: [
    {
      id: "visao-geral",
      titulo: "Como funciona a rescisão de contrato de trabalho",
      blocos: [
        {
          tipo: "p",
          texto:
            "Toda rescisão é a soma de verbas específicas — nunca um valor único e mágico. O erro mais comum é calcular só o óbvio (saldo de salário) e esquecer o resto, ou aplicar a regra errada pro tipo de desligamento errado. Este guia separa cada verba em um capítulo, com a fórmula exata, e termina com uma calculadora pra você conferir o total na hora.",
        },
        {
          tipo: "p",
          texto:
            "Antes de calcular qualquer coisa, você precisa saber duas coisas: (1) qual foi o tipo de desligamento, porque isso muda quais verbas entram; e (2) a data de admissão e a data do desligamento, porque é isso que define quanto de férias e 13º são proporcionais.",
        },
        {
          tipo: "h3",
          texto: "As verbas que podem entrar numa rescisão",
        },
        {
          tipo: "lista",
          itens: [
            "Saldo de salário — dias trabalhados no mês do desligamento",
            "Aviso prévio — trabalhado ou indenizado, proporcional ao tempo de casa",
            "Férias vencidas — se houver período completo não gozado",
            "Férias proporcionais + 1/3 constitucional",
            "13º salário proporcional",
            "Multa do FGTS (40% ou 20%, dependendo do tipo de desligamento)",
          ],
        },
        {
          tipo: "p",
          texto:
            "Nos próximos capítulos você vê cada uma dessas verbas em detalhe. No capítulo 6 tem uma tabela comparando o que entra (ou não) em cada tipo de desligamento, e no capítulo 8 uma calculadora que junta tudo automaticamente.",
        },
      ],
    },
    {
      id: "saldo-e-aviso",
      titulo: "Saldo de salário e aviso prévio",
      blocos: [
        {
          tipo: "h3",
          texto: "Saldo de salário",
        },
        {
          tipo: "p",
          texto:
            "É a remuneração dos dias efetivamente trabalhados no mês do desligamento, contados sobre um mês comercial de 30 dias (não o número real de dias do mês).",
        },
        {
          tipo: "template",
          titulo: "Fórmula — Saldo de salário",
          texto: "Saldo de salário = (Salário ÷ 30) × dias trabalhados no mês",
        },
        {
          tipo: "h3",
          texto: "Aviso prévio",
        },
        {
          tipo: "p",
          texto:
            "O aviso prévio pode ser trabalhado (a pessoa continua os últimos dias trabalhando, geralmente com direito a 2h a menos por dia ou dispensa dos últimos 7 dias corridos) ou indenizado (a empresa paga o período e a pessoa não trabalha mais). Quem pede demissão avisa a empresa com 30 dias de antecedência; quem é desligado sem justa causa recebe o aviso da empresa.",
        },
        {
          tipo: "p",
          texto:
            "Pela Lei 12.506/2011, o aviso prévio não é sempre 30 dias: ele cresce com o tempo de casa. São 30 dias fixos, mais 3 dias por ano completo trabalhado na mesma empresa, até um teto de 90 dias.",
        },
        {
          tipo: "template",
          titulo: "Fórmula — Aviso prévio proporcional",
          texto:
            "Dias de aviso prévio = 30 + (3 × anos completos de casa), com teto de 90 dias\n\nExemplo: 4 anos completos de casa → 30 + (3 × 4) = 42 dias de aviso prévio",
        },
        {
          tipo: "p",
          texto:
            "Quando o aviso é indenizado, o valor pago é proporcional a esses dias (não apenas 30), calculado sobre o salário do dia. Na justa causa, não há aviso prévio nem para o empregado nem pago pela empresa.",
        },
      ],
    },
    {
      id: "ferias",
      titulo: "Férias proporcionais e vencidas na rescisão",
      blocos: [
        {
          tipo: "p",
          texto:
            "Cada 12 meses trabalhados formam um \"período aquisitivo\" de férias. Se a pessoa já completou um período inteiro e ainda não tirou essas férias, elas entram como férias vencidas (valor cheio + 1/3, em dobro se a empresa já estava fora do prazo legal pra conceder). O período aquisitivo em andamento no momento do desligamento entra como férias proporcionais.",
        },
        {
          tipo: "template",
          titulo: "Fórmula — Férias proporcionais",
          texto:
            "Meses trabalhados no período aquisitivo em curso: conte 1 mês a cada 30 dias corridos desde o início desse período; frações de 15 dias ou mais arredondam pra cima, até o teto de 12 meses.\n\nFérias proporcionais = (Salário ÷ 12) × meses trabalhados\n1/3 constitucional = Férias proporcionais ÷ 3",
        },
        {
          tipo: "p",
          texto:
            "Atenção: quem pede demissão tem direito às férias proporcionais normalmente — não existe regra que tire esse direito por causa do tipo de desligamento (a única exceção real é a justa causa, que não afeta férias já adquiridas, só afasta o aviso prévio e a multa do FGTS).",
        },
      ],
    },
    {
      id: "decimo-terceiro",
      titulo: "13º salário proporcional na rescisão",
      blocos: [
        {
          tipo: "p",
          texto:
            "O 13º proporcional é contado dentro do ano civil (janeiro a dezembro), não a partir da data de admissão. Se a pessoa foi admitida em março e saiu em outubro do mesmo ano, o cálculo considera os meses de março a outubro daquele ano — nunca ultrapassando o ano corrente.",
        },
        {
          tipo: "template",
          titulo: "Fórmula — 13º proporcional",
          texto:
            "Meses trabalhados no ano civil: fração de 15 dias ou mais no mês conta como mês cheio.\n\n13º proporcional = (Salário ÷ 12) × meses trabalhados no ano",
        },
        {
          tipo: "p",
          texto:
            "Se a empresa já pagou a primeira parcela do 13º durante o ano (comum entre fevereiro e novembro), esse valor deve ser descontado do total apurado na rescisão — senão a pessoa recebe em dobro.",
        },
      ],
    },
    {
      id: "fgts-multa",
      titulo: "FGTS e a multa rescisória",
      blocos: [
        {
          tipo: "p",
          texto:
            "Durante todo o contrato, a empresa deposita mensalmente 8% do salário na conta do FGTS do funcionário. Isso não é pago na rescisão — já está depositado. O que muda na rescisão é a multa sobre o saldo do FGTS, que só existe em alguns tipos de desligamento.",
        },
        {
          tipo: "lista",
          itens: [
            "Sem justa causa: multa de 40% sobre todo o saldo do FGTS da conta (incluindo depósitos de contratos anteriores na mesma empresa, se houver)",
            "Acordo entre as partes (art. 484-A da CLT): multa de 20% sobre o saldo, e a pessoa pode sacar 80% do FGTS",
            "Pedido de demissão: sem multa, e o FGTS fica retido (só é sacado em outras hipóteses, como aposentadoria)",
            "Justa causa: sem multa, FGTS retido",
          ],
        },
        {
          tipo: "p",
          texto:
            "O valor exato da multa depende do saldo real da conta do FGTS, que só aparece no extrato oficial (app FGTS ou site da Caixa). Neste guia, a calculadora estima esse saldo a partir do salário e do tempo de casa (8% ao mês) — é uma aproximação útil pra ter noção do valor, não o número final que vai sair no TRCT.",
        },
      ],
    },
    {
      id: "por-tipo",
      titulo: "Rescisão por tipo: o que entra em cada uma",
      blocos: [
        {
          tipo: "p",
          texto:
            "Aqui está o comparativo direto — para saber rápido o que calcular em cada situação, sem precisar reler os capítulos anteriores.",
        },
        {
          tipo: "h3",
          texto: "Sem justa causa (a empresa demite)",
        },
        {
          tipo: "lista",
          itens: [
            "Saldo de salário: sim",
            "Aviso prévio (trabalhado ou indenizado): sim",
            "Férias vencidas + proporcionais + 1/3: sim",
            "13º proporcional: sim",
            "Multa do FGTS: 40%",
            "Saque do FGTS: liberado",
            "Seguro-desemprego: elegível (se cumprir os requisitos)",
          ],
        },
        {
          tipo: "h3",
          texto: "Pedido de demissão (o funcionário sai)",
        },
        {
          tipo: "lista",
          itens: [
            "Saldo de salário: sim",
            "Aviso prévio: a pessoa deve cumprir 30 dias ou a empresa pode descontar o equivalente",
            "Férias vencidas + proporcionais + 1/3: sim",
            "13º proporcional: sim",
            "Multa do FGTS: não há",
            "Saque do FGTS: retido",
            "Seguro-desemprego: não elegível",
          ],
        },
        {
          tipo: "h3",
          texto: "Acordo entre as partes (art. 484-A da CLT)",
        },
        {
          tipo: "lista",
          itens: [
            "Saldo de salário: sim",
            "Aviso prévio: pela metade, se indenizado",
            "Férias vencidas + proporcionais + 1/3: sim (integrais)",
            "13º proporcional: sim (integral)",
            "Multa do FGTS: 20%",
            "Saque do FGTS: até 80% do saldo",
            "Seguro-desemprego: não elegível",
          ],
        },
        {
          tipo: "h3",
          texto: "Justa causa",
        },
        {
          tipo: "lista",
          itens: [
            "Saldo de salário: sim",
            "Aviso prévio: não há",
            "Férias vencidas + 1/3: sim, se houver período completo",
            "Férias proporcionais: não há direito",
            "13º proporcional: não há direito (posição predominante, ainda que discutida em alguns tribunais)",
            "Multa do FGTS: não há",
            "Saque do FGTS: retido",
            "Seguro-desemprego: não elegível",
          ],
        },
        {
          tipo: "p",
          texto:
            "A justa causa é a mais arriscada de aplicar sem orientação jurídica: exige motivo previsto em lei, prova documental e, geralmente, um histórico de advertências. Errar aqui costuma gerar reversão na Justiça do Trabalho e o pagamento retroativo de tudo que faltou.",
        },
      ],
    },
    {
      id: "documentos-prazos",
      titulo: "Documentos obrigatórios, homologação e prazo de pagamento",
      blocos: [
        {
          tipo: "p",
          texto:
            "Desde a Reforma Trabalhista de 2017, a homologação sindical deixou de ser obrigatória para a maioria dos casos — mas os documentos e prazos continuam valendo, e é aqui que a maioria das pequenas empresas se atrapalha e acaba pagando multa por atraso.",
        },
        {
          tipo: "p",
          texto:
            "O prazo legal para pagamento das verbas rescisórias é de até 10 dias corridos contados a partir do término do contrato — independente do tipo de desligamento e de o aviso ter sido trabalhado ou indenizado. Perder esse prazo gera multa equivalente a um salário do funcionário (art. 477, §8º da CLT).",
        },
        {
          tipo: "checklist",
          id: "checklist-fechamento-desligamento",
          itens: [
            "Calcular todas as verbas devidas (use a calculadora do capítulo 8)",
            "Gerar o TRCT (Termo de Rescisão do Contrato de Trabalho)",
            "Emitir as guias do FGTS (saque e, se houver, multa rescisória)",
            "Agendar ou confirmar o exame demissional",
            "Solicitar a chave de conectividade social / liberar o saque do FGTS quando aplicável",
            "Emitir a Comunicação de Dispensa (CD) e o requerimento do seguro-desemprego, se elegível",
            "Confirmar o pagamento das verbas dentro do prazo de 10 dias corridos",
            "Arquivar cópia assinada de todos os documentos",
          ],
        },
      ],
    },
    {
      id: "casos-praticos",
      titulo: "Casos práticos e calculadora",
      blocos: [
        {
          tipo: "p",
          texto:
            "Antes de usar a calculadora abaixo com os dados reais do seu caso, veja este exemplo completo pra entender como as peças se encaixam.",
        },
        {
          tipo: "template",
          titulo: "Caso prático — Sem justa causa",
          texto:
            "Salário: R$ 3.000,00\nAdmissão: 01/03/2024 · Desligamento: 20/09/2026 (2 anos e ~7 meses de casa)\nDias trabalhados no mês do desligamento: 20\nAviso prévio: indenizado, proporcional (30 + 3×2 = 36 dias)\n\nSaldo de salário: (3000 ÷ 30) × 20 = R$ 2.000,00\nAviso prévio indenizado: 36 dias ≈ R$ 3.600,00 (usando 30 dias fixos como aproximação didática do capítulo 2, ajustável conforme a política interna)\nFérias proporcionais (7 meses do período em curso): (3000 ÷ 12) × 7 = R$ 1.750,00\n1/3 sobre férias: R$ 583,33\n13º proporcional (9 meses de 2026): (3000 ÷ 12) × 9 = R$ 2.250,00\nMulta do FGTS (estimada, 8% a.m. × 31 meses × 40%): ≈ R$ 2.976,00\n\nUse a calculadora abaixo pra reproduzir esse caso ou testar o seu.",
        },
        {
          tipo: "calculadora",
          ferramenta: "rescisao",
        },
        {
          tipo: "p",
          texto:
            "Guardou o número? Agora é só gerar o TRCT com esses valores no seu sistema de folha (ou repassar pro seu contador) e seguir o checklist do capítulo anterior pra fechar o desligamento sem correr risco de multa por atraso.",
        },
        {
          tipo: "conclusao",
          titulo: "Guia concluído — próximo passo",
          mensagem:
            "Você já sabe calcular cada verba da rescisão e o total consolidado. Antes de fechar de vez o desligamento, dois próximos passos práticos:",
          acoes: [
            { label: "Revisar o checklist de fechamento", capituloId: "documentos-prazos" },
            { label: "Voltar ao painel de guias", href: "/" },
          ],
        },
      ],
    },
  ],
};
