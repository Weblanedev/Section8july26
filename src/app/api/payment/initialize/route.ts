import { NextRequest, NextResponse } from "next/server";
import { initializeKoraPayment } from "@/lib/korapay";

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

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const redirectPath =
      type === "affiliate" ? "/affiliate/success" : "/checkout/success";

    const result = await initializeKoraPayment({
      amount,
      email,
      name,
      redirectUrl: `${appUrl}${redirectPath}`,
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
