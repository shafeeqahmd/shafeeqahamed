import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import { JsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://shafeeq.colorkloud.us";
const siteTitle = "Shafeeq Ahamed | DevOps Engineer in San Francisco";
const siteDescription =
  "DevOps Engineer in San Francisco with 6+ years building cloud infrastructure, GPU model-serving, Kubernetes, Terraform, and production systems at scale. AWS certified. Builder of PingPulse.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Shafeeq Ahamed",
  },
  description: siteDescription,
  keywords: [
    "Shafeeq Ahamed",
    "DevOps Engineer",
    "Platform Engineer",
    "SRE",
    "San Francisco",
    "AWS",
    "Kubernetes",
    "Terraform",
    "Ansible",
    "GPU infrastructure",
    "Cloudflare",
    "PingPulse",
    "CI/CD",
    "AWS Certified DevOps Engineer",
  ],
  authors: [{ name: "Shafeeq Ahamed", url: siteUrl }],
  creator: "Shafeeq Ahamed",
  publisher: "Shafeeq Ahamed",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Shafeeq Ahamed",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/assets/profile.jpg",
        width: 1024,
        height: 1020,
        alt: "Shafeeq Ahamed - DevOps Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/assets/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/assets/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/assets/profile.jpg" }],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <JsonLd />
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:shadow"
        >
          Skip to content
        </a>
        <Navbar />
        <div className="h-20" aria-hidden="true"></div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
