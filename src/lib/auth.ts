import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30; // 30 dias

function segredo() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16) {
    throw new Error("SESSION_SECRET não configurado (ou curto demais).");
  }
  return new TextEncoder().encode(s);
}

export interface SessaoPayload {
  membroId: string;
  email: string;
}

export async function criarSessaoCookie(payload: SessaoPayload) {
  const token = await new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.membroId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(segredo());

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function destruirSessaoCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

/** Lê e valida a sessão a partir do cookie. Sempre chamado no servidor. */
export async function lerSessao(): Promise<SessaoPayload | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, segredo());
    if (!payload.sub || typeof payload.email !== "string") return null;
    return { membroId: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}
