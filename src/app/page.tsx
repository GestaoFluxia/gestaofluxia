import Link from "next/link";
import { redirect } from "next/navigation";
import { lerSessao } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { PRODUTOS, produtoPorCaktoId } from "@/lib/products";
import { guiaPorSlug } from "@/content";
import { LogoutLink } from "@/components/LogoutLink";

export default async function PainelPage() {
  const sessao = await lerSessao();
  if (!sessao) redirect("/login");

  const supabase = supabaseAdmin();
  const { data: membro } = await supabase
    .from("membros")
    .select("email, produtos_liberados, progresso")
    .eq("id", sessao.membroId)
    .maybeSingle();

  if (!membro) redirect("/login");

  const produtosLiberados = (membro.produtos_liberados as string[])
    .map(produtoPorCaktoId)
    .filter((p): p is NonNullable<typeof p> => !!p);

  const progresso = (membro.progresso as Record<string, { capituloAtual?: number }>) ?? {};

  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-500/80">
              Área de Membros
            </p>
            <h1 className="mt-1 text-2xl font-bold text-neutral-50 sm:text-3xl">
              Seus guias
            </h1>
          </div>
          <LogoutLink />
        </header>

        {produtosLiberados.length === 0 ? (
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-8 text-center">
            <p className="text-neutral-300">
              Nenhum guia liberado ainda pra {membro.email}.
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              Se você acabou de comprar, aguarde alguns minutos ou fale com o suporte.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {produtosLiberados.map((produto) => {
              const guia = guiaPorSlug(produto.slug);
              const totalCapitulos = guia?.capitulos.length ?? 1;
              const capituloAtual = progresso[produto.slug]?.capituloAtual ?? 0;
              const percentual = Math.round(((capituloAtual + 1) / totalCapitulos) * 100);
              const iniciado = capituloAtual > 0 || Object.keys(progresso[produto.slug] ?? {}).length > 0;

              return (
                <Link
                  key={produto.slug}
                  href={`/p/${produto.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900/80 to-neutral-900/20 p-6 transition hover:border-emerald-700/50 hover:from-neutral-900"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-3xl">{produto.icone}</span>
                    {percentual === 100 ? (
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                        Concluído ✓
                      </span>
                    ) : iniciado ? (
                      <span className="rounded-full bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-400">
                        {percentual}%
                      </span>
                    ) : (
                      <span className="rounded-full bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-400">
                        Novo
                      </span>
                    )}
                  </div>

                  <h2 className="text-lg font-semibold text-neutral-50 group-hover:text-emerald-400">
                    {produto.nomeCurto}
                  </h2>
                  <p className="mt-1.5 text-sm text-neutral-400">{produto.resumo}</p>

                  <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-neutral-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all"
                      style={{ width: `${percentual}%` }}
                    />
                  </div>

                  <span className="mt-4 inline-block text-sm font-medium text-emerald-500 group-hover:text-emerald-400">
                    {iniciado ? "Continuar →" : "Começar →"}
                  </span>
                </Link>
              );
            })}
          </div>
        )}

        {produtosLiberados.length > 0 && produtosLiberados.length < PRODUTOS.length && (
          <p className="mt-10 text-center text-sm text-neutral-600">
            Comprou outro guia e não aparece aqui? Fale com o suporte informando o e-mail da compra.
          </p>
        )}
      </div>
    </main>
  );
}
