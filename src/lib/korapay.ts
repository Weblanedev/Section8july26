import { generateReference } from "@/lib/format";

const KORAPAY_API = "https://api.korapay.com/merchant/api/v1";

export interface InitializePaymentParams {
  amount: number;
  currency?: string;
  email: string;
  name?: string;
  reference?: string;
  redirectUrl: string;
  narration?: string;
  metadata?: Record<string, string>;
}

export interface InitializePaymentResult {
  reference: string;
  checkoutUrl: string;
}

export async function initializeKoraPayment(
  params: InitializePaymentParams
): Promise<InitializePaymentResult> {
  const secretKey = process.env.KORAPAY_SECRET_KEY;

  if (!secretKey || secretKey.includes("your_secret_key")) {
    // Demo mode - return mock checkout for development
    const reference = params.reference || generateReference();
    return {
      reference,
      checkoutUrl: `${params.redirectUrl}?reference=${reference}&demo=true`,
    };
  }

  const reference = params.reference || generateReference();

  const response = await fetch(`${KORAPAY_API}/charges/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: params.amount,
      currency: params.currency || "NGN",
      reference,
      redirect_url: params.redirectUrl,
      narration: params.narration || "Section Eight Payment",
      customer: {
        email: params.email,
        name: params.name,
      },
      metadata: params.metadata,
      channels: ["card", "bank_transfer", "pay_with_bank"],
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || "Failed to initialize payment");
  }

  return {
    reference: data.data.reference,
    checkoutUrl: data.data.checkout_url,
  };
}

export async function verifyKoraPayment(reference: string) {
  const secretKey = process.env.KORAPAY_SECRET_KEY;

  if (!secretKey || secretKey.includes("your_secret_key")) {
    return { status: "success", reference, demo: true };
  }

  const response = await fetch(
    `${KORAPAY_API}/charges/${reference}`,
    {
      headers: { Authorization: `Bearer ${secretKey}` },
    }
  );

  const data = await response.json();
  return data.data;
}
