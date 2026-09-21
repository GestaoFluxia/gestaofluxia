import { redirect, notFound } from "next/navigation";
import { lerSessao } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { produtoPorSlug } from "@/lib/products";
import { guiaPorSlug } from "@/content";
import { GuiaApp } from "@/components/GuiaApp";

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ produto: string }>;
}) {
  const { produto: slug } = await params;

  // Sessão SEMPRE validada no servidor — nunca confiar em um redirect client-side.
  const sessao = await lerSessao();
  if (!sessao) {
    redirect("/login");
  }

  const produto = produtoPorSlug(slug);
  const guia = guiaPorSlug(slug);
  if (!produto || !guia) {
    notFound();
  }

  const supabase = supabaseAdmin();
  const { data: membro } = await supabase
    .from("membros")
    .select("produtos_liberados, progresso")
    .eq("id", sessao.membroId)
    .maybeSingle();

  if (!membro) {
    redirect("/login");
  }

  const liberado = (membro.produtos_liberados as string[]).includes(produto.caktoProductId);
  if (!liberado) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-neutral-950 px-4 text-center">
        <h1 className="text-xl font-semibold text-neutral-100">Você ainda não tem acesso a este guia</h1>
        <p className="max-w-md text-sm text-neutral-400">
          Se você comprou o {produto.nomeCurto} e está vendo esta mensagem, fale com o suporte
          informando o e-mail usado na compra.
        </p>
        <a href="/" className="mt-2 text-sm text-emerald-400 hover:underline">
          Voltar ao painel
        </a>
      </main>
    );
  }

  const progressoSalvo = (membro.progresso as Record<string, unknown>)?.[slug] as
    | { capituloAtual?: number; checklist?: Record<string, Record<string, boolean>> }
    | undefined;

  return (
    <GuiaApp
      produtoSlug={slug}
      guia={guia}
      progressoInicial={{
        capituloAtual: progressoSalvo?.capituloAtual ?? 0,
        checklist: progressoSalvo?.checklist ?? {},
      }}
    />
  );
}
