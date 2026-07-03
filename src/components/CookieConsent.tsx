"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

type ConsentLevel = "all" | "essential" | null;

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [prefs, setPrefs] = useState({
    advertising: true,
    analytics: true,
    personalization: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem("s8-cookie-consent");
    if (!stored) setVisible(true);
  }, []);

  const save = (level: ConsentLevel) => {
    localStorage.setItem("s8-cookie-consent", level ?? "essential");
    setVisible(false);
    setShowManage(false);
    if (level === "all") toast.success("Preferences saved. Enjoy personalized deals!");
    else toast.success("Only essential cookies enabled.");
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="w-full max-w-lg rounded-2xl bg-white text-gray-900 shadow-2xl animate-slide-up overflow-hidden">
        <div className="bg-marketplace px-6 py-4 text-white">
          <h2 className="text-lg font-bold">We value your privacy</h2>
          <p className="text-sm opacity-90 mt-1">
            We use cookies to improve your shopping experience and show relevant offers.
          </p>
        </div>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {!showManage ? (
            <>
              <p className="text-sm text-gray-600 leading-relaxed">
                Essential cookies keep the site running. Optional cookies help us personalize
                your experience. Learn more in our{" "}
                <Link href="/privacy" className="text-marketplace font-medium hover:underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-marketplace font-medium hover:underline">
                  Cookie Notice
                </Link>.
              </p>
              <div className="rounded-lg bg-gray-50 p-3 text-sm">
                <p className="font-semibold">Essential cookies</p>
                <p className="text-gray-500 text-xs mt-1">
                  Enable shopping cart, secure checkout, and account access.
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-semibold">Customize your experience</p>
              {(
                [
                  ["advertising", "Advertising Cookies", "Show relevant ads and offers"],
                  ["analytics", "Analytics Cookies", "Help us improve your experience"],
                  ["personalization", "Personalization Cookies", "Remember your preferences"],
                ] as const
              ).map(([key, label, desc]) => (
                <label
                  key={key}
                  className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={prefs[key]}
                    onChange={(e) =>
                      setPrefs({ ...prefs, [key]: e.target.checked })
                    }
                    className="mt-1 accent-marketplace"
                  />
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 p-4 border-t bg-gray-50">
          {!showManage ? (
            <>
              <button
                onClick={() => setShowManage(true)}
                className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-semibold hover:bg-white"
              >
                Manage Cookies
              </button>
              <button
                onClick={() => save("essential")}
                className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-semibold hover:bg-white"
              >
                Reject Optional
              </button>
              <button
                onClick={() => save("all")}
                className="flex-1 rounded-lg bg-marketplace py-2.5 text-sm font-bold text-white hover:bg-marketplace-dark"
              >
                Accept All
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowManage(false)}
                className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => save("all")}
                className="flex-1 rounded-lg bg-marketplace py-2.5 text-sm font-bold text-white"
              >
                Save Preferences
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
