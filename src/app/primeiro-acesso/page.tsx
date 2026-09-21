import { PrimeiroAcessoForm } from "@/components/PrimeiroAcessoForm";

export default function PrimeiroAcessoPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-4 py-12">
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-600/20 blur-[100px]"
        aria-hidden
      />
      <div className="relative w-full max-w-sm rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 shadow-2xl shadow-black/40 backdrop-blur">
        <div className="mb-6 text-center">
          <span className="text-2xl">🔑</span>
          <h1 className="mt-3 text-xl font-bold text-neutral-50">Primeiro acesso</h1>
          <p className="mt-1.5 text-sm text-neutral-400">
            Comprou e não recebeu o e-mail de acesso? Digite o e-mail usado na compra e enviamos
            um novo login.
          </p>
        </div>
        <PrimeiroAcessoForm />
      </div>
    </main>
  );
}
