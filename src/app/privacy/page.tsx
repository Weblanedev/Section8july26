import type { Metadata } from "next";
import PolicyLayout, {
  PolicyList,
  PolicySection,
  PolicySubheading,
} from "@/components/PolicyLayout";
import { createPageMetadata } from "@/lib/metadata";
import { companyContact, siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "How Section Eight collects, uses and protects your personal data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PolicyLayout title="Privacy Policy">
      <p>
        <strong className="text-primary">Last Updated:</strong>{" "}
        {companyContact.policyLastUpdated}
      </p>

      <PolicySection title="1. Introduction">
        <p>
          Welcome to {siteConfig.name} (&quot;we,&quot; &quot;our,&quot; or
          &quot;us&quot;). We operate a modern tech products marketplace in Nigeria,
          offering phones, laptops, accessories, gaming gear, and related
          electronics. We are committed to protecting your privacy and ensuring
          you have a positive experience on our website and when using our
          products and services. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you visit our
          website and purchase our products.
        </p>
      </PolicySection>

      <PolicySection title="2. Information We Collect">
        <PolicySubheading>Personal Information</PolicySubheading>
        <p className="mb-4">
          We collect personal information that you provide directly to us,
          including:
        </p>
        <PolicyList>
          <li>Name and contact information (email address, phone number)</li>
          <li>Shipping and billing addresses</li>
          <li>
            Payment information (processed securely through our payment
            processors)
          </li>
          <li>Account credentials if you create an account</li>
          <li>
            Communications with us (customer service inquiries, feedback)
          </li>
        </PolicyList>

        <PolicySubheading>Automatically Collected Information</PolicySubheading>
        <p className="mb-4">
          When you visit our website, we automatically collect certain
          information, including:
        </p>
        <PolicyList>
          <li>IP address and browser type</li>
          <li>Device information and operating system</li>
          <li>Pages visited and time spent on our website</li>
          <li>Referring website addresses</li>
          <li>Cookies and similar tracking technologies</li>
        </PolicyList>
      </PolicySection>

      <PolicySection title="3. How We Use Your Information">
        <p className="mb-4">We use the information we collect to:</p>
        <PolicyList>
          <li>Process and fulfill your orders</li>
          <li>Send you order confirmations and shipping updates</li>
          <li>Respond to your inquiries and provide customer support</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Improve our website and product offerings</li>
          <li>Detect and prevent fraud and unauthorized access</li>
          <li>Comply with legal obligations</li>
        </PolicyList>
      </PolicySection>

      <PolicySection title="4. Information Sharing and Disclosure">
        <p className="mb-4">
          We do not sell your personal information. We may share your information
          in the following circumstances:
        </p>
        <PolicyList>
          <li>
            <strong className="text-primary">Service Providers:</strong> We share
            information with third-party service providers who perform services
            on our behalf, such as payment processing, shipping, and email
            delivery.
          </li>
          <li>
            <strong className="text-primary">Legal Requirements:</strong> We may
            disclose information if required by law or in response to valid
            requests by public authorities.
          </li>
          <li>
            <strong className="text-primary">Business Transfers:</strong> In the
            event of a merger, acquisition, or sale of assets, your information
            may be transferred.
          </li>
        </PolicyList>
      </PolicySection>

      <PolicySection title="5. Data Security">
        <p>
          We implement appropriate technical and organizational security measures
          to protect your personal information against unauthorized access,
          alteration, disclosure, or destruction. However, no method of
          transmission over the Internet or electronic storage is 100% secure.
        </p>
      </PolicySection>

      <PolicySection title="6. Your Rights">
        <p className="mb-4">You have the right to:</p>
        <PolicyList>
          <li>Access and receive a copy of your personal information</li>
          <li>Correct inaccurate or incomplete information</li>
          <li>Request deletion of your personal information</li>
          <li>Opt-out of marketing communications</li>
          <li>Withdraw consent where processing is based on consent</li>
        </PolicyList>
      </PolicySection>

      <PolicySection title="7. Cookies">
        <p>
          We use cookies and similar tracking technologies to enhance your
          experience on our website. You can control cookies through your browser
          settings, but disabling cookies may affect website functionality.
        </p>
      </PolicySection>

      <PolicySection title="8. Children's Privacy">
        <p>
          Our website is not intended for children under the age of 18. We do not
          knowingly collect personal information from children.
        </p>
      </PolicySection>

      <PolicySection title="9. Changes to This Privacy Policy">
        <p>
          We may update this Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page and
          updating the &quot;Last Updated&quot; date.
        </p>
      </PolicySection>

      <PolicySection title="10. Contact Us">
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        <ul className="space-y-2">
          <li>
            <strong className="text-primary">Email:</strong>{" "}
            {companyContact.email}
          </li>
          <li>
            <strong className="text-primary">Phone:</strong>{" "}
            {companyContact.phoneDisplay}
          </li>
          <li>
            <strong className="text-primary">Address:</strong>{" "}
            {companyContact.addressShort}
          </li>
        </ul>
      </PolicySection>
    </PolicyLayout>
  );
}
