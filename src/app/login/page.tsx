import { LoginForm } from "@/components/LoginForm";
import { LoginHero } from "@/components/LoginHero";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-4 py-12">
      <div
        className="animate-aurora pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-emerald-600/20 blur-[110px]"
        aria-hidden
      />
      <div
        className="animate-aurora-lenta pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-teal-500/15 blur-[110px]"
        aria-hidden
      />

      <div className="animate-fade-up relative grid w-full max-w-4xl overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/50 shadow-2xl shadow-black/50 backdrop-blur-xl sm:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-emerald-950/50 via-neutral-900 to-neutral-950 p-10 sm:block">
          <LoginHero />
        </div>

        <div className="flex flex-col justify-center p-8 sm:p-10">
          <div className="mb-7">
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
