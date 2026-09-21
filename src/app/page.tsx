import { redirect } from "next/navigation";
import { lerSessao } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { produtoPorCaktoId } from "@/lib/products";

export default async function Home() {
  const sessao = await lerSessao();
  if (!sessao) redirect("/login");

  const supabase = supabaseAdmin();
  const { data: membro } = await supabase
    .from("membros")
    .select("produtos_liberados")
    .eq("id", sessao.membroId)
    .maybeSingle();

  const primeiroProduto = (membro?.produtos_liberados as string[] | undefined)
    ?.map(produtoPorCaktoId)
    .find(Boolean);

  redirect(primeiroProduto ? `/p/${primeiroProduto.slug}` : "/login");
}
