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
    <html lang="en">
      <body
        className={`${inter.className} bg-white p-3 text-black dark:bg-black dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
