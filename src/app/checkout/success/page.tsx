import { redirect } from "next/navigation";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Legacy gateway redirect target → new payment callback. */
export default async function CheckoutSuccessRedirect({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const reference = first(params.reference);
  const query = reference
    ? `?reference=${encodeURIComponent(reference)}`
    : "";
  redirect(`/payment/callback/order${query}`);
}
