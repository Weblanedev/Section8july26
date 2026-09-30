import { NextRequest, NextResponse } from "next/server";
import { initializeKoraPayment } from "@/lib/korapay";

/** Prefer the live request origin so redirects never stick to a stale localhost env value. */
function resolveAppUrl(request: NextRequest): string {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).origin;
    } catch {
      /* ignore bad origin */
    }
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).origin;
    } catch {
      /* ignore bad referer */
    }
  }

  const host =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (host && !host.includes("localhost") && !host.startsWith("127.")) {
    const proto = request.headers.get("x-forwarded-proto") || "https";
    return `${proto}://${host}`.replace(/\/$/, "");
  }

  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  return "http://localhost:3000";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, email, name, type, metadata } = body;

    if (!amount || !email) {
      return NextResponse.json(
        { error: "Amount and email are required" },
        { status: 400 }
      );
    }

    const appUrl = resolveAppUrl(request);
    const paymentType = type === "affiliate" ? "affiliate" : "order";
    const redirectUrl = `${appUrl}/payment/callback/${paymentType}`;

    const result = await initializeKoraPayment({
      amount,
      email,
      name,
      redirectUrl,
      narration:
        type === "affiliate"
          ? "Section Eight Affiliate Subscription"
          : "Section Eight Order Payment",
      metadata: { type: type || "order", ...metadata },
    });

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Payment initialization failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
