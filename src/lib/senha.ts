import { randomInt } from "crypto";

const ALFABETO = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";

export function gerarSenhaAleatoria(tamanho = 10): string {
  let senha = "";
  for (let i = 0; i < tamanho; i++) {
    senha += ALFABETO[randomInt(0, ALFABETO.length)];
  }
  return senha;
}
