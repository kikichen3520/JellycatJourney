import { Baloo_2, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const display = Baloo_2({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} font-[family-name:var(--font-body)] text-[#4A3B2E]`}
        style={{
          backgroundColor: "#F5EBE0",
          backgroundImage: "radial-gradient(#4A3B2E26 1px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
      >
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}