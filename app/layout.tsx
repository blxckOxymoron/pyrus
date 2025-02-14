import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Papyrus",
  description: "Train your handwriting with Papyrus",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-pt-4 scroll-smooth">
      <body
        className={`${inter.className} min-h-[100svh] max-w-[100dvw] select-none bg-white text-black selection:bg-sky-500/60 dark:bg-black dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
