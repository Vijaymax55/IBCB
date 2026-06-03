import type { Metadata } from "next";
import { Playfair_Display, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ibcb.vijaymax.cloud"),
  title: "IBCB — Institution Building & Capacity Building | Model CLF Team | DAY-NRLM",
  description:
    "Official portal of the IBCB Model CLF Team under DAY-NRLM, Ministry of Rural Development, Government of India. Building 34,000 community institutions for a Viksit Bharat by 2047.",
  keywords: [
    "IBCB", "Model CLF", "DAY-NRLM", "NRLM", "Cluster Level Federation",
    "Institution Building", "Capacity Building", "Viksit Bharat",
    "Ministry of Rural Development", "SHG", "Self Help Group",
    "Community Institution", "CLF", "Swavalambi CLF", "Viksit CLF",
    "DAY NRLM team", "MCLF", "rural livelihoods India",
  ],
  authors: [{ name: "IBCB Model CLF Team, DAY-NRLM" }],
  creator: "DAY-NRLM NMMU",
  publisher: "Ministry of Rural Development, Government of India",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://ibcb.vijaymax.cloud",
    title: "IBCB — Model CLF Team | DAY-NRLM",
    description: "Building 34,000 community institutions for a Viksit Bharat by 2047.",
    siteName: "IBCB Model CLF Team",
    images: [{ url: "https://ibcb.vijaymax.cloud/og-image.jpg", width: 1200, height: 630, alt: "IBCB Model CLF Team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IBCB — Model CLF Team | DAY-NRLM",
    description: "Building 34,000 community institutions for a Viksit Bharat by 2047.",
    images: ["https://ibcb.vijaymax.cloud/og-image.jpg"],
  },
  alternates: { canonical: "https://ibcb.vijaymax.cloud" },
  verification: {
    google: "A_udUzHIfsy-3WuDK9WWEDOSr5mPdmP6uk3-FY5dli4",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="flex flex-col min-h-screen bg-cream text-ink">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
