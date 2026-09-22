import Link from "next/link";
import { redirect } from "next/navigation";
import { lerSessao } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { produtoPorCaktoId } from "@/lib/products";
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
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-500/80">
              Área de Membros
            </p>
            <h1 className="mt-1 text-2xl font-bold text-neutral-50 sm:text-3xl">Sua jornada</h1>
            <p className="mt-1.5 text-sm text-neutral-400">
              Siga na ordem: primeiro entender, depois colocar em prática.
            </p>
          </div>
          <LogoutLink />
        </header>

        {produtosLiberados.length === 0 ? (
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-8 text-center">
            <p className="text-neutral-300">Nenhum guia liberado ainda pra {membro.email}.</p>
            <p className="mt-2 text-sm text-neutral-500">
              Se você acabou de comprar, aguarde alguns minutos ou fale com o suporte.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {produtosLiberados.map((produto) => {
              const guia = guiaPorSlug(produto.slug);
              if (!guia) return null;

              const capituloAtual = progresso[produto.slug]?.capituloAtual ?? 0;
              const percentual = Math.round(
                ((capituloAtual + 1) / guia.capitulos.length) * 100
              );
              const indiceDe = (id: string) => guia.capitulos.findIndex((c) => c.id === id);

              return (
                <section key={produto.slug}>
                  <div className="mb-6 flex items-center gap-4">
                    <span className="text-3xl">{produto.icone}</span>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg font-semibold text-neutral-50">
                        {produto.nomeCurto}
                      </h2>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-800">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                            style={{ width: `${percentual}%` }}
                          />
                        </div>
                        <span className="text-xs tabular-nums text-neutral-500">
                          {percentual}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <ol className="space-y-3">
                    {guia.jornada.map((etapa, i) => {
                      const indices = etapa.capituloIds.map(indiceDe).filter((n) => n >= 0);
                      const concluida = indices.every((n) => n < capituloAtual);
                      const emAndamento = !concluida && indices.some((n) => n <= capituloAtual);
                      const primeiroCapitulo = etapa.capituloIds[0];

                      return (
                        <li key={etapa.id}>
                          <Link
                            href={`/p/${produto.slug}?cap=${primeiroCapitulo}`}
                            className={`group flex gap-4 rounded-2xl border p-5 transition ${
                              emAndamento
                                ? "border-emerald-700/50 bg-emerald-950/20"
                                : "border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 hover:bg-neutral-900/60"
                            }`}
                          >
                            <span
                              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                                concluida
                                  ? "bg-emerald-500 text-neutral-950"
                                  : emAndamento
                                    ? "border-2 border-emerald-500 text-emerald-400"
                                    : "border border-neutral-700 text-neutral-500"
                              }`}
                            >
                              {concluida ? "✓" : i + 1}
                            </span>

                            <div className="min-w-0 flex-1">
                              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                                <span
                                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                                    etapa.fase === "teoria"
                                      ? "bg-sky-500/10 text-sky-400"
                                      : "bg-emerald-500/10 text-emerald-400"
                                  }`}
                                >
                                  {etapa.fase === "teoria" ? "Entenda" : "Pratique"}
                                </span>
                                {emAndamento && (
                                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
                                    Você está aqui
                                  </span>
                                )}
                              </div>

                              <h3 className="font-semibold text-neutral-100 group-hover:text-emerald-400">
                                {etapa.titulo}
                              </h3>
                              <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                                {etapa.descricao}
                              </p>
                              <span className="mt-2.5 inline-block text-sm font-medium text-emerald-500">
                                {concluida ? "Revisar" : emAndamento ? "Continuar" : "Começar"} →
                              </span>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
