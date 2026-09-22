export type Bloco =
  | { tipo: "p"; texto: string }
  | { tipo: "h3"; texto: string }
  | { tipo: "lista"; itens: string[] }
  | { tipo: "template"; titulo?: string; texto: string }
  | { tipo: "checklist"; id: string; itens: string[] }
  | { tipo: "calculadora"; ferramenta: "rescisao" | "ferias" | "decimoTerceiro" | "horaExtra" }
  | { tipo: "comparador" }
  | {
      tipo: "conclusao";
      titulo: string;
      mensagem: string;
      acoes: { label: string; capituloId?: string; href?: string }[];
    };

export interface Capitulo {
  id: string;
  titulo: string;
  blocos: Bloco[];
}

/** Uma etapa da jornada guiada que aparece no painel depois do login. */
export interface EtapaJornada {
  id: string;
  fase: "teoria" | "pratica";
  titulo: string;
  descricao: string;
  capituloIds: string[];
}

export interface Guia {
  slug: string;
  titulo: string;
  capitulos: Capitulo[];
  jornada: EtapaJornada[];
}
