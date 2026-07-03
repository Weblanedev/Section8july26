import type { Metadata } from "next";
import PolicyLayout, {
  PolicyLink,
  PolicyList,
  PolicySection,
  PolicySubheading,
} from "@/components/PolicyLayout";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Refund & Return Policy",
  description: "Section Eight refund, return and exchange policy for your orders.",
  path: "/refund-return",
});

export default function RefundReturnPage() {
  return (
    <PolicyLayout title="Refund & Return Policy">
      <p>
        <strong className="text-primary">Last Updated:</strong>{" "}
        {new Date().toLocaleDateString()}
      </p>

      <PolicySection title="Return Policy">
        <p className="mb-4">
          We want you to be completely satisfied with your purchase. If you are
          not satisfied, you may return most items within 30 days of delivery
          for a full refund or exchange.
        </p>

        <PolicySubheading>Conditions for Returns</PolicySubheading>
        <PolicyList>
          <li>
            Items must be unused, unworn, and in their original packaging
          </li>
          <li>Items must have all tags and labels attached</li>
          <li>Items must be in the same condition as when received</li>
          <li>Proof of purchase (order number or receipt) is required</li>
          <li>Returns must be initiated within 30 days of delivery</li>
        </PolicyList>

        <PolicySubheading>Items Not Eligible for Return</PolicySubheading>
        <PolicyList>
          <li>Items that have been used, worn, or damaged</li>
          <li>Items without original packaging or tags</li>
          <li>Personalized or customized items</li>
          <li>Items purchased more than 30 days ago</li>
          <li>Gift cards and promotional items</li>
        </PolicyList>
      </PolicySection>

      <PolicySection title="How to Return an Item">
        <PolicyList ordered>
          <li>
            Contact our customer service team at{" "}
            <PolicyLink href="mailto:returns@section8.com">
              returns@section8.com
            </PolicyLink>{" "}
            or call +234 800 000 0000 to initiate a return
          </li>
          <li>Provide your order number and reason for return</li>
          <li>
            You will receive a Return Authorization (RA) number and instructions
          </li>
          <li>
            Package the item securely with the RA number visible on the package
          </li>
          <li>
            Ship the item to the address provided in the return instructions
          </li>
          <li>
            We recommend using a trackable shipping method as we are not
            responsible for lost return packages
          </li>
        </PolicyList>
      </PolicySection>

      <PolicySection title="Refund Policy">
        <p className="mb-4">
          Once we receive and inspect your returned item, we will process your
          refund within 5-7 business days.
        </p>

        <PolicySubheading>Refund Method</PolicySubheading>
        <p className="mb-4">
          Refunds will be issued to the original payment method used for the
          purchase. Please note that it may take additional time for the refund
          to appear in your account, depending on your bank or payment provider.
        </p>

        <PolicySubheading>Refund Amount</PolicySubheading>
        <PolicyList>
          <li>
            Full refund of the item price for items returned in original
            condition
          </li>
          <li>
            Original shipping costs are non-refundable unless the item is
            defective or we made an error
          </li>
          <li>
            Return shipping costs are the responsibility of the customer unless
            the item is defective or we made an error
          </li>
        </PolicyList>
      </PolicySection>

      <PolicySection title="Exchanges">
        <p>
          If you need to exchange an item for a different size, color, or style,
          please contact our customer service team. Exchanges are subject to
          product availability. If the item you want is not available, we will
          process a refund instead.
        </p>
      </PolicySection>

      <PolicySection title="Defective or Damaged Items">
        <p>
          If you receive a defective or damaged item, please contact us
          immediately with photos of the damage. We will arrange for a
          replacement or full refund, and we will cover all return shipping
          costs.
        </p>
      </PolicySection>

      <PolicySection title="Processing Time">
        <PolicyList>
          <li>
            <strong className="text-primary">Return Processing:</strong> 5-7
            business days after we receive your returned item
          </li>
          <li>
            <strong className="text-primary">Refund Processing:</strong> 3-5
            business days after approval
          </li>
          <li>
            <strong className="text-primary">Credit Card Refunds:</strong> 5-10
            business days to appear in your account
          </li>
        </PolicyList>
      </PolicySection>

      <PolicySection title="Contact Us">
        <p className="mb-4">
          For questions about returns or refunds, please contact us:
        </p>
        <ul className="space-y-2">
          <li>
            <strong className="text-primary">Email:</strong>{" "}
            <PolicyLink href="mailto:returns@section8.com">
              returns@section8.com
            </PolicyLink>
          </li>
          <li>
            <strong className="text-primary">Phone:</strong> +234 800 000 0000
          </li>
          <li>
            <strong className="text-primary">Hours:</strong> Monday - Friday,
            9AM - 6PM WAT
          </li>
        </ul>
      </PolicySection>
    </PolicyLayout>
  );
}
