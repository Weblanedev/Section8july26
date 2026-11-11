const KORAPAY_SCRIPT_SRC =
  "https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js";

export interface KoraCheckoutCustomer {
  name: string;
  email: string;
}

export interface KoraCheckoutResult {
  amount?: string;
  reference?: string;
  status?: string;
}

export interface OpenKoraCheckoutParams {
  reference: string;
  amount: number;
  currency?: string;
  customer: KoraCheckoutCustomer;
  narration?: string;
  metadata?: Record<string, string>;
  onSuccess?: (data: KoraCheckoutResult) => void;
  onFailed?: (data: KoraCheckoutResult) => void;
  onClose?: () => void;
}

declare global {
  interface Window {
    Korapay?: {
      initialize: (options: Record<string, unknown>) => void;
      close?: () => void;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function getPublicKey(): string {
  const key = process.env.NEXT_PUBLIC_KORAPAY_PUBLIC_KEY?.trim();
  if (!key) {
    throw new Error(
      "Payment is not configured. Missing NEXT_PUBLIC_KORAPAY_PUBLIC_KEY."
    );
  }
  return key;
}

function loadKorapayScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Korapay can only run in the browser"));
  }

  if (window.Korapay) {
    return Promise.resolve();
  }

  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${KORAPAY_SCRIPT_SRC}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => {
          scriptPromise = null;
          reject(new Error("Failed to load Korapay checkout"));
        },
        { once: true }
      );
      if (window.Korapay) resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = KORAPAY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Failed to load Korapay checkout"));
    };
    document.body.appendChild(script);
  });

  return scriptPromise;
}

export async function openKoraCheckout(
  params: OpenKoraCheckoutParams
): Promise<void> {
  const publicKey = getPublicKey();
  await loadKorapayScript();

  if (!window.Korapay?.initialize) {
    throw new Error("Korapay checkout failed to initialize");
  }

  window.Korapay.initialize({
    key: publicKey,
    reference: params.reference,
    amount: params.amount,
    currency: params.currency || "NGN",
    customer: {
      name: params.customer.name,
      email: params.customer.email,
    },
    narration: params.narration || "Section Eight Payment",
    metadata: params.metadata,
    channels: ["card", "bank_transfer", "pay_with_bank"],
    onSuccess: params.onSuccess,
    onFailed: params.onFailed,
    onClose: params.onClose,
  });
}
