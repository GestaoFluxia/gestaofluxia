import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";
import { produtoPorCaktoId } from "@/lib/products";
import { gerarSenhaAleatoria } from "@/lib/senha";
import { enviarEmailBoasVindas, enviarEmailNovoProdutoLiberado } from "@/lib/email";

const TOLERANCIA_SEGUNDOS = 5 * 60;

interface PedidoData {
  id: string;
  status: string;
  customer: { email: string; name?: string };
  product: { id: string; name?: string };
}

function assinaturaValida(rawBody: string, timestamp: string | null, assinatura: string | null): boolean {
  const segredo = process.env.CAKTO_WEBHOOK_SECRET;
  if (!segredo || !timestamp || !assinatura) return false;

  const agora = Date.now() / 1000;
  if (Math.abs(agora - Number(timestamp)) > TOLERANCIA_SEGUNDOS) return false;

  const esperado = crypto
    .createHmac("sha256", segredo)
    .update(`${timestamp}.`)
    .update(rawBody)
    .digest("hex");

  const a = Buffer.from(assinatura);
  const b = Buffer.from(`v1=${esperado}`);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const tokenEsperado = process.env.WEBHOOK_TOKEN;
  const tokenRecebido = req.nextUrl.searchParams.get("token");
  if (!tokenEsperado || tokenRecebido !== tokenEsperado) {
    return NextResponse.json({ erro: "Token inválido." }, { status: 401 });
  }

  const rawBody = await req.text();
  const timestamp = req.headers.get("X-Cakto-Timestamp");
  const assinatura = req.headers.get("X-Cakto-Signature");

  if (!assinaturaValida(rawBody, timestamp, assinatura)) {
    return NextResponse.json({ erro: "Assinatura inválida." }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as { event: string; data: PedidoData | PedidoData[] };
  const { event } = payload;
  const pedidos = Array.isArray(payload.data) ? payload.data : [payload.data];

  const supabase = supabaseAdmin();

  for (const pedido of pedidos) {
    if (!pedido?.id) continue;

    const chaveDedupe = `${event}:${pedido.id}`;
    const { data: jaProcessado } = await supabase
      .from("webhook_eventos")
      .select("id")
      .eq("id", chaveDedupe)
      .maybeSingle();

    if (jaProcessado) continue;

    if (event === "purchase_approved") {
      await processarCompraAprovada(supabase, pedido);
    } else if (event === "refund" || event === "chargeback") {
      await processarRevogacao(supabase, pedido);
    }

    await supabase.from("webhook_eventos").insert({ id: chaveDedupe, tipo: event });
  }

  return NextResponse.json({ ok: true });
}

async function processarCompraAprovada(
  supabase: ReturnType<typeof supabaseAdmin>,
  pedido: PedidoData
) {
  const produto = produtoPorCaktoId(pedido.product.id);
  if (!produto) return; // pedido de um produto que este app não gerencia

  const email = pedido.customer.email.trim().toLowerCase();

  const { data: membroExistente } = await supabase
    .from("membros")
    .select("id, produtos_liberados")
    .eq("email", email)
    .maybeSingle();

  if (!membroExistente) {
    const senha = gerarSenhaAleatoria();
    const senhaHash = await bcrypt.hash(senha, 10);

    const { error } = await supabase.from("membros").insert({
      email,
      senha_hash: senhaHash,
      produtos_liberados: [produto.caktoProductId],
    });

    if (error) {
      // corrida rara: outro pedido do mesmo comprador criou o membro entre o select e o insert
      if (error.code === "23505") {
        await liberarProdutoParaMembroExistente(supabase, email, produto.caktoProductId, produto.nome);
      }
      return;
    }

    try {
      await enviarEmailBoasVindas({ email, senha, nomeProduto: produto.nome });
    } catch {
      // e-mail falhou: a pessoa ainda consegue acesso via /primeiro-acesso
    }
    return;
  }

  await liberarProdutoParaMembroExistente(
    supabase,
    email,
    produto.caktoProductId,
    produto.nome,
    membroExistente
  );
}

async function liberarProdutoParaMembroExistente(
  supabase: ReturnType<typeof supabaseAdmin>,
  email: string,
  caktoProductId: string,
  nomeProduto: string,
  membroJaCarregado?: { id: string; produtos_liberados: string[] }
) {
  const membro =
    membroJaCarregado ??
    (
      await supabase
        .from("membros")
        .select("id, produtos_liberados")
        .eq("email", email)
        .maybeSingle()
    ).data;

  if (!membro) return;

  if (membro.produtos_liberados.includes(caktoProductId)) return; // já liberado, reentrega de webhook

  const novosProdutos = [...membro.produtos_liberados, caktoProductId];
  await supabase.from("membros").update({ produtos_liberados: novosProdutos }).eq("id", membro.id);

  try {
    await enviarEmailNovoProdutoLiberado({ email, nomeProduto });
  } catch {
    // e-mail falhou: acesso já está liberado no banco, só a notificação não chegou
  }
}

async function processarRevogacao(supabase: ReturnType<typeof supabaseAdmin>, pedido: PedidoData) {
  const produto = produtoPorCaktoId(pedido.product.id);
  if (!produto) return;

  const email = pedido.customer.email.trim().toLowerCase();

  const { data: membro } = await supabase
    .from("membros")
    .select("id, produtos_liberados")
    .eq("email", email)
    .maybeSingle();

  if (!membro) return;

  const restantes = membro.produtos_liberados.filter((id: string) => id !== produto.caktoProductId);
  if (restantes.length === membro.produtos_liberados.length) return; // não tinha esse produto

  await supabase.from("membros").update({ produtos_liberados: restantes }).eq("id", membro.id);
}
