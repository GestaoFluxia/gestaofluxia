import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";
import { gerarSenhaAleatoria } from "@/lib/senha";
import { enviarEmailBoasVindas } from "@/lib/email";
import { produtoPorCaktoId } from "@/lib/products";

// Resposta sempre genérica, exista ou não o e-mail na base — evita que alguém
// use este formulário pra descobrir quais e-mails já compraram (enumeração).
const MENSAGEM_PADRAO =
  "Se esse e-mail tiver uma compra aprovada, você vai receber um novo acesso em instantes.";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email) {
    return NextResponse.json({ erro: "Informe o e-mail usado na compra." }, { status: 400 });
  }

  const supabase = supabaseAdmin();
  const { data: membro } = await supabase
    .from("membros")
    .select("id, produtos_liberados")
    .eq("email", email)
    .maybeSingle();

  if (membro && membro.produtos_liberados.length > 0) {
    const senha = gerarSenhaAleatoria();
    const senhaHash = await bcrypt.hash(senha, 10);
    await supabase.from("membros").update({ senha_hash: senhaHash }).eq("id", membro.id);

    const primeiroProduto = membro.produtos_liberados.map(produtoPorCaktoId).find(Boolean);
    try {
      await enviarEmailBoasVindas({
        email,
        senha,
        nomeProduto: primeiroProduto?.nome ?? "seus guias",
      });
    } catch {
      // sem segundo plano de fallback aqui por design: não exibimos a senha na tela
      // pra não permitir sequestro de conta por quem só sabe o e-mail da vítima.
    }
  }

  return NextResponse.json({ ok: true, mensagem: MENSAGEM_PADRAO });
}
