"use client";

import "./global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/query-client";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 2000,
              style: {
                background: "rgba(17, 24, 39, 0.88)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(20px)",
                borderRadius: "18px",
                padding: "16px 20px",
                minWidth: "280px",
                fontSize: "14px",
                fontWeight: "500",
                boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
              },
              success: {
                iconTheme: {
                  primary: "#a855f7",
                  secondary: "#ffffff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ec4899",
                  secondary: "#ffffff",
                },
              },
            }}
          />

          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}