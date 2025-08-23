import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Layout from "@/components/Layout";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Coderrpay",
  description: "Sponsorships and grants for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="" />
      </head>
      <body
        className={`${manrope.variable} antialiased`}
        style={{ fontFamily: "var(--font-manrope), 'Noto Sans', sans-serif" }}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
