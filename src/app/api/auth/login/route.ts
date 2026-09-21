import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";
import { criarSessaoCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const senha = typeof body?.senha === "string" ? body.senha : "";

  if (!email || !senha) {
    return NextResponse.json({ erro: "Informe e-mail e senha." }, { status: 400 });
  }

  const supabase = supabaseAdmin();
  const { data: membro, error } = await supabase
    .from("membros")
    .select("id, email, senha_hash, produtos_liberados")
    .eq("email", email)
    .maybeSingle();

  if (error || !membro) {
    return NextResponse.json({ erro: "E-mail ou senha incorretos." }, { status: 401 });
  }

  const senhaValida = await bcrypt.compare(senha, membro.senha_hash);
  if (!senhaValida) {
    return NextResponse.json({ erro: "E-mail ou senha incorretos." }, { status: 401 });
  }

  await criarSessaoCookie({ membroId: membro.id, email: membro.email });

  return NextResponse.json({ ok: true, redirect: "/" });
}
