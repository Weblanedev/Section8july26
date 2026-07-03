import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description:
    "Learn about Section Eight - Nigeria's modern tech products marketplace for phones, laptops and accessories.",
  path: "/about",
});

const values = [
  {
    title: "Quality First",
    description:
      "We only offer products that meet our high standards of quality and durability. Every item is carefully vetted before it reaches you.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    ),
  },
  {
    title: "Customer Focus",
    description:
      "Your satisfaction is our top priority. We're here to help you find the perfect products and provide exceptional service every step of the way.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    ),
  },
  {
    title: "Sustainable",
    description:
      "We're committed to sustainable practices and ethical sourcing. Our products are chosen with environmental and social responsibility in mind.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    ),
  },
];

const reasons = [
  {
    title: "Curated Selection",
    description:
      "Each product is handpicked by our team of experts to ensure quality and style.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    ),
  },
  {
    title: "Fast Delivery",
    description:
      "Quick and reliable shipping across Nigeria to get your products to you fast.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m18 0v2.625A1.125 1.125 0 0118.375 18h-2.25m-6 0H3.375m0 0H1.5m1.5 0v-2.25m0-2.25v-2.25m0 0h15m-15 0v2.25m0 2.25v2.25m0 0h15m-15 0H3.375m0 0H1.5m15 0v2.25m0-2.25v-2.25m0 2.25H21.75m-15 0h15"
      />
    ),
  },
  {
    title: "Secure Payment",
    description:
      "Your transactions are safe and secure with our encrypted payment system.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    ),
  },
  {
    title: "30-Day Returns",
    description:
      "Not satisfied? Return your purchase within 30 days for a full refund.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    ),
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden px-4 py-20">
        <div className="absolute inset-0 mesh-bg" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xl md:text-2xl text-muted leading-relaxed">
            Where Quality Meets Style - Curating Premium Products for Your
            Lifestyle
          </p>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="card p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                At Section Eight, we are passionate about curating premium
                products that enhance your lifestyle and reflect your unique
                personality. We believe that great products should be accessible
                to everyone.
              </p>
              <p>
                Our mission is to provide you with carefully selected products
                that combine exceptional craftsmanship, timeless design, and
                outstanding value. Every item in our collection is chosen with
                meticulous attention to detail.
              </p>
              <p>
                We work with trusted suppliers and brands to bring you reliable
                products at fair prices, ensuring that quality meets value in every
                purchase.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="card p-8 text-center hover:border-accent/30 transition-colors"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    {value.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          <div className="card p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Why Choose Section Eight?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-lg bg-accent/10 p-3 text-accent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      {reason.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{reason.title}</h3>
                    <p className="text-muted text-sm">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
