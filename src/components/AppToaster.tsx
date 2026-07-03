"use client";

import { Toaster } from "react-hot-toast";

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#131A2B",
          color: "#F8FAFC",
          border: "1px solid rgba(6, 182, 212, 0.2)",
          borderRadius: "12px",
        },
        success: {
          iconTheme: { primary: "#10B981", secondary: "#F8FAFC" },
        },
        error: {
          iconTheme: { primary: "#EF4444", secondary: "#F8FAFC" },
        },
      }}
    />
  );
}
