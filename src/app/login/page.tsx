import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-4 py-12">
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-600/20 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-teal-500/10 blur-[100px]"
        aria-hidden
      />

      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40 shadow-2xl shadow-black/40 backdrop-blur sm:grid-cols-2">
        <div className="hidden flex-col justify-between bg-gradient-to-br from-emerald-950/60 via-neutral-900 to-neutral-950 p-10 sm:flex">
          <div>
            <span className="text-2xl">🧮</span>
            <h1 className="mt-6 text-2xl font-bold leading-snug text-neutral-50">
              Seus guias de RH,
              <br />
              prontos pra usar hoje.
            </h1>
            <p className="mt-3 text-sm text-neutral-400">
              Nada de PDF parado no computador. Capítulos, calculadoras e checklists dentro de
              um app de verdade.
            </p>
          </div>

          <ul className="space-y-3 text-sm text-neutral-300">
            <li className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                ✓
              </span>
              Calculadoras interativas embutidas
            </li>
            <li className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                ✓
              </span>
              Progresso salvo automaticamente
            </li>
            <li className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                ✓
              </span>
              Funciona liso no celular
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-center p-8 sm:p-10">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-neutral-50">Entrar</h2>
            <p className="mt-1 text-sm text-neutral-400">
              Use o e-mail e a senha que você recebeu após a compra.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
