import type { Guia } from "./types";

export const guiaScriptDesligamento: Guia = {
  slug: "script-desligamento",
  titulo: "Script de Conversa de Desligamento",
  jornada: [
    {
      id: "preparar",
      fase: "teoria",
      titulo: "Prepare a conversa antes de chamar",
      descricao:
        "O que precisa estar pronto: cálculo fechado, local, horário, documentos e quem participa da reunião.",
      capituloIds: ["antes-da-conversa"],
    },
    {
      id: "o-que-falar",
      fase: "teoria",
      titulo: "Saiba o que dizer (e o que nunca dizer)",
      descricao:
        "Roteiro de abertura por tipo de desligamento e a lista de frases que viram prova em processo trabalhista.",
      capituloIds: ["abrindo-a-conversa", "frases-risco"],
    },
    {
      id: "conduzir",
      fase: "pratica",
      titulo: "Conduza a conversa de verdade",
      descricao:
        "Respostas prontas pra choro, raiva e tentativa de negociação, e como encerrar com prazos claros.",
      capituloIds: ["reacoes-emocionais", "encerrando"],
    },
    {
      id: "aprender",
      fase: "pratica",
      titulo: "Transforme a saída em aprendizado",
      descricao:
        "Roteiro de entrevista de desligamento pra descobrir o que a empresa precisa corrigir.",
      capituloIds: ["roteiro-entrevista"],
    },
  ],
  capitulos: [
    {
      id: "antes-da-conversa",
      titulo: "Antes da conversa: o que preparar",
      blocos: [
        {
          tipo: "p",
          texto:
            "A parte mais arriscada de um desligamento raramente é o cálculo — é a conversa. Uma comunicação mal feita transforma uma demissão tecnicamente correta em motivo de processo, exposição nas redes ou clima destruído com o resto da equipe. Este guia é o roteiro pra você não improvisar nesse momento.",
        },
        {
          tipo: "h3",
          texto: "Checklist antes de chamar a pessoa",
        },
        {
          tipo: "checklist",
          id: "checklist-pre-conversa",
          itens: [
            "Cálculo da rescisão já fechado (use o guia Rescisão Sem Erro se ainda não calculou)",
            "Decisão final tomada — nunca comunique um desligamento \"em aberto\" pra negociar na hora",
            "Local reservado, privado, sem interrupção (nunca em corredor ou grupo)",
            "Horário definido: evite fim de expediente de sexta-feira ou véspera de feriado sempre que possível",
            "Documentos de desligamento prontos ou a caminho (aviso, TRCT quando aplicável)",
            "Definido quem mais participa da reunião (RH + gestor direto, nunca só um deles sozinho em casos sensíveis)",
            "Combinado internamente o que será dito ao restante da equipe depois",
            "Acesso a sistemas, e-mail e crachá com plano de desativação definido para o mesmo dia",
          ],
        },
      ],
    },
    {
      id: "abrindo-a-conversa",
      titulo: "Como abrir a conversa — roteiro por tipo de desligamento",
      blocos: [
        {
          tipo: "p",
          texto:
            "A abertura define o tom de tudo que vem depois. A regra de ouro: seja direto nos primeiros 30 segundos. Enrolar antes de dar a notícia aumenta a ansiedade e a sensação de descontrole da pessoa.",
        },
        {
          tipo: "template",
          titulo: "Abertura — Sem justa causa",
          texto:
            "\"[Nome], obrigado por vir. Preciso te comunicar uma decisão da empresa: vamos encerrar seu contrato de trabalho, com desligamento sem justa causa, efetivo a partir de [data]. Essa decisão já está tomada e não está relacionada a nenhum problema disciplinar seu — vou te explicar o motivo e como ficam os próximos passos.\"",
        },
        {
          tipo: "template",
          titulo: "Abertura — Acordo entre as partes (484-A)",
          texto:
            "\"[Nome], queria conversar sobre uma possibilidade: encerrar seu contrato por acordo entre as partes, que te garante uma parte da multa do FGTS e o saque de até 80% do saldo, mas sem direito a seguro-desemprego. Quero te explicar como funciona e você não precisa decidir agora.\"",
        },
        {
          tipo: "template",
          titulo: "Abertura — Justa causa",
          texto:
            "\"[Nome], preciso te comunicar que a empresa decidiu encerrar seu contrato por justa causa, com base em [motivo específico e documentado]. Isso já foi analisado com o jurídico/RH e a documentação de suporte está organizada. Vou te explicar o que isso significa nos seus direitos.\"",
        },
        {
          tipo: "p",
          texto:
            "Nunca aplique justa causa numa conversa improvisada. Ela exige motivo previsto em lei e, quase sempre, um histórico de advertências documentado — sem isso, o risco de reversão judicial (com pagamento retroativo de tudo) é alto.",
        },
        {
          tipo: "template",
          titulo: "Abertura — Pedido de demissão (quando é a pessoa que decide)",
          texto:
            "\"Entendi sua decisão de sair, [Nome]. Vamos formalizar o pedido de demissão com data de saída em [data]. Preciso te explicar como fica o aviso prévio e o que você recebe no acerto.\"",
        },
      ],
    },
    {
      id: "frases-risco",
      titulo: "Frases que geram risco jurídico x frases seguras",
      blocos: [
        {
          tipo: "p",
          texto:
            "Certas frases, ditas na hora do desligamento, viram prova em processo trabalhista — mesmo quando ditas com boa intenção. A tabela abaixo troca o que evitar pelo que dizer no lugar.",
        },
        {
          tipo: "h3",
          texto: "Evite",
        },
        {
          tipo: "lista",
          itens: [
            "\"Você não serve mais pra empresa\" — vago, ofensivo, sem base documental",
            "\"Isso é culpa sua, você sabe bem o motivo\" — atribui culpa sem citar fato concreto",
            "\"Já vou avisar que você foi demitido por justa causa pros outros\" — exposição, dano moral",
            "\"Se você aceitar sair calado, a gente resolve isso rapidinho\" — sugere coação",
            "\"Depois a gente vê os valores, confia em mim\" — promessa vaga sobre direitos",
          ],
        },
        {
          tipo: "h3",
          texto: "Use no lugar",
        },
        {
          tipo: "lista",
          itens: [
            "\"A decisão foi tomada pela empresa, com base em [motivo objetivo, se houver]\"",
            "\"Vou te passar por escrito exatamente o que você tem direito a receber\"",
            "\"Essa conversa é confidencial, e o motivo do desligamento não será comunicado à equipe\"",
            "\"Você tem o direito de levar essa proposta pra pensar antes de assinar\" (em acordos)",
            "\"Todos os valores estão neste documento, com prazo de pagamento de até 10 dias corridos\"",
          ],
        },
      ],
    },
    {
      id: "reacoes-emocionais",
      titulo: "Lidando com reações emocionais na hora da conversa",
      blocos: [
        {
          tipo: "p",
          texto:
            "Cada pessoa reage de um jeito — choro, silêncio, raiva, negociação, ou aparente indiferença. Nenhuma dessas reações significa que você fez algo errado; o erro está em como você responde a elas.",
        },
        {
          tipo: "h3",
          texto: "Se a pessoa chorar ou ficar em silêncio",
        },
        {
          tipo: "template",
          texto:
            "\"Tudo bem, pode levar o tempo que precisar. Quando quiser, seguimos com as informações práticas — ou, se preferir, te mando tudo por escrito e a gente conversa em outro momento sobre o que ficou de dúvida.\"",
        },
        {
          tipo: "h3",
          texto: "Se a pessoa reagir com raiva ou for hostil",
        },
        {
          tipo: "template",
          texto:
            "\"Entendo que essa notícia gera essa reação. Não vou entrar em discussão agora — vou te garantir que todos os seus direitos serão respeitados e que você vai receber tudo por escrito.\"",
        },
        {
          tipo: "p",
          texto:
            "Não entre em debate sobre o mérito da decisão nem prometa reconsiderar na hora só pra acalmar a situação — isso gera expectativa que vira problema depois.",
        },
        {
          tipo: "h3",
          texto: "Se a pessoa tentar negociar (\"me dá mais uma chance\")",
        },
        {
          tipo: "template",
          texto:
            "\"Eu entendo o pedido, mas essa decisão já foi tomada e não está em aberto pra negociação agora. O que posso fazer é te ajudar a entender os próximos passos e garantir uma transição organizada.\"",
        },
      ],
    },
    {
      id: "encerrando",
      titulo: "Encerrando com clareza: próximos passos e prazos",
      blocos: [
        {
          tipo: "p",
          texto:
            "Toda conversa de desligamento deve terminar com a pessoa sabendo exatamente o que vai acontecer a seguir — isso reduz ansiedade e reduz drasticamente a chance de mal-entendido virar reclamação.",
        },
        {
          tipo: "template",
          titulo: "Fechamento padrão",
          texto:
            "\"Recapitulando: seu último dia é [data]. Você vai receber [documento] até [data], e o pagamento das verbas rescisórias cai até [data, no máximo 10 dias corridos após o desligamento]. Qualquer dúvida depois de hoje, pode falar com [nome/contato do RH]. Obrigado pelo tempo que você dedicou aqui.\"",
        },
        {
          tipo: "lista",
          itens: [
            "Confirme a data do último dia de trabalho",
            "Informe quando os documentos serão entregues",
            "Confirme o prazo de pagamento (até 10 dias corridos)",
            "Dê um contato direto pra dúvidas posteriores",
            "Encerre com respeito, independente do motivo do desligamento",
          ],
        },
      ],
    },
    {
      id: "roteiro-entrevista",
      titulo: "Roteiro de entrevista de desligamento",
      blocos: [
        {
          tipo: "p",
          texto:
            "Depois da comunicação oficial (em outro momento, nunca na mesma conversa do desligamento), a entrevista de desligamento é uma oportunidade real de aprendizado organizacional — mas só funciona se a pessoa se sentir segura pra ser honesta.",
        },
        {
          tipo: "template",
          titulo: "Perguntas da entrevista de desligamento",
          texto:
            "1. O que fez você aceitar trabalhar aqui, e isso se confirmou na prática?\n2. O que mais pesou na sua saída (ou na decisão da empresa, se for o caso)?\n3. Como você avalia a relação com sua liderança direta?\n4. Havia algo que poderia ter mudado essa situação, se resolvido antes?\n5. O que você recomendaria mudar pra quem ainda está na equipe?\n6. Você recomendaria a empresa pra alguém próximo? Por quê?",
        },
        {
          tipo: "p",
          texto:
            "Aplique sempre em conversa separada da comunicação do desligamento, de preferência com alguém que não seja o gestor direto da pessoa — isso aumenta a honestidade das respostas.",
        },
        {
          tipo: "conclusao",
          titulo: "Guia concluído — próximo passo",
          mensagem:
            "Você já tem o roteiro pra conduzir qualquer desligamento com segurança. Antes da próxima conversa difícil, revise o checklist de preparação:",
          acoes: [
            { label: "Revisar o checklist antes da conversa", capituloId: "antes-da-conversa" },
            { label: "Voltar ao painel de guias", href: "/" },
          ],
        },
      ],
    },
  ],
};
