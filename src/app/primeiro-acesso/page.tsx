import { PrimeiroAcessoForm } from "@/components/PrimeiroAcessoForm";

export default function PrimeiroAcessoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-neutral-950 px-4 py-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-neutral-50">Primeiro acesso</h1>
        <p className="mt-1 max-w-sm text-sm text-neutral-400">
          Comprou e não recebeu o e-mail de acesso? Digite o e-mail usado na compra e enviamos um
          novo login.
        </p>
      </div>
      <PrimeiroAcessoForm />
    </main>
  );
}
