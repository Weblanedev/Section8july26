import { NextRequest, NextResponse } from "next/server";
import { verifyKoraPayment } from "@/lib/korapay";

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");
  const demo = request.nextUrl.searchParams.get("demo");

  if (!reference) {
    return NextResponse.json({ error: "Reference required" }, { status: 400 });
  }

  if (demo === "true") {
    return NextResponse.json({
      status: "success",
      reference,
      demo: true,
    });
  }

  try {
    const result = await verifyKoraPayment(reference);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
