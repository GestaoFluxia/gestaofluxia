import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-neutral-950 px-4 py-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-neutral-50">Área de Membros</h1>
        <p className="mt-1 text-sm text-neutral-400">Entre com o e-mail e a senha que você recebeu por e-mail após a compra.</p>
      </div>
      <LoginForm />
    </main>
  );
}
