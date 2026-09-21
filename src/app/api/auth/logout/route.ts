import { NextResponse } from "next/server";
import { destruirSessaoCookie } from "@/lib/auth";

export async function POST() {
  await destruirSessaoCookie();
  return NextResponse.json({ ok: true });
}
