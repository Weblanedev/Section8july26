import { redirect } from "next/navigation";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Fallback if gateway lands on /payment/callback without a type segment. */
export default async function PaymentCallbackIndex({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const reference = first(params.reference);
  const type = first(params.type) === "affiliate" ? "affiliate" : "order";
  const query = reference
    ? `?reference=${encodeURIComponent(reference)}`
    : "";
  redirect(`/payment/callback/${type}${query}`);
}
