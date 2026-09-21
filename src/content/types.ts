export type Bloco =
  | { tipo: "p"; texto: string }
  | { tipo: "h3"; texto: string }
  | { tipo: "lista"; itens: string[] }
  | { tipo: "template"; titulo?: string; texto: string }
  | { tipo: "checklist"; id: string; itens: string[] }
  | { tipo: "calculadora"; ferramenta: "rescisao" | "ferias" | "decimoTerceiro" | "horaExtra" }
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

export interface Guia {
  slug: string;
  titulo: string;
  capitulos: Capitulo[];
}
