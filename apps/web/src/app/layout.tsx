import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AutoTrader",
  description: "Crypto trading analysis platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
