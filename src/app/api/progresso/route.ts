import { NextRequest, NextResponse } from "next/server";
import { lerSessao } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { produtoPorSlug } from "@/lib/products";

export async function POST(req: NextRequest) {
  const sessao = await lerSessao();
  if (!sessao) {
    return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const produtoSlug = typeof body?.produtoSlug === "string" ? body.produtoSlug : "";
  const produto = produtoPorSlug(produtoSlug);
  if (!produto) {
    return NextResponse.json({ erro: "Produto inválido." }, { status: 400 });
  }

  const capituloAtual = typeof body?.capituloAtual === "number" ? body.capituloAtual : 0;
  const checklist = typeof body?.checklist === "object" && body?.checklist !== null ? body.checklist : {};

  const supabase = supabaseAdmin();

  const { data: membro, error: erroBusca } = await supabase
    .from("membros")
    .select("produtos_liberados, progresso")
    .eq("id", sessao.membroId)
    .maybeSingle();

  if (erroBusca || !membro) {
    return NextResponse.json({ erro: "Membro não encontrado." }, { status: 404 });
  }

  if (!(membro.produtos_liberados as string[]).includes(produto.caktoProductId)) {
    return NextResponse.json({ erro: "Sem acesso a este produto." }, { status: 403 });
  }

  const progressoAtualizado = {
    ...(membro.progresso as Record<string, unknown>),
    [produtoSlug]: { capituloAtual, checklist },
  };

  const { error: erroUpdate } = await supabase
    .from("membros")
    .update({ progresso: progressoAtualizado })
    .eq("id", sessao.membroId);

  if (erroUpdate) {
    return NextResponse.json({ erro: "Falha ao salvar progresso." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
