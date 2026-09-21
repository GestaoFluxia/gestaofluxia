import { Resend } from "resend";

function resendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY não configurado.");
  return new Resend(key);
}

function remetente() {
  // Domínio de teste do Resend por padrão. Trocar por um domínio próprio
  // verificado antes de vender pra clientes reais (RESEND_FROM_EMAIL).
  return process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
}

function urlApp() {
  return process.env.APP_URL || "http://localhost:3000";
}

export async function enviarEmailBoasVindas(params: {
  email: string;
  senha: string;
  nomeProduto: string;
}) {
  const resend = resendClient();
  const link = `${urlApp()}/login`;

  return resend.emails.send({
    from: remetente(),
    to: params.email,
    subject: `Seu acesso a "${params.nomeProduto}" está liberado`,
    text: `Sua compra foi aprovada! Aqui está o seu acesso:

Link de acesso: ${link}
Login: ${params.email}
Senha: ${params.senha}

Assim que entrar, recomendamos trocar a senha (em breve isso ficará disponível direto no app).

Qualquer problema pra acessar, use a página "Primeiro acesso" no login com o e-mail usado na compra.`,
  });
}

export async function enviarEmailNovoProdutoLiberado(params: { email: string; nomeProduto: string }) {
  const resend = resendClient();
  const link = `${urlApp()}/login`;

  return resend.emails.send({
    from: remetente(),
    to: params.email,
    subject: `Novo guia liberado: ${params.nomeProduto}`,
    text: `Sua compra de "${params.nomeProduto}" foi aprovada e já está liberada na sua conta.

Acesse com o login e senha que você já usa: ${link}`,
  });
}
