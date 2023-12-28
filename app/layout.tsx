import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const ZenKakuGothicNew = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Noob Front End Engineer Blog",
  description: "意識低めのフロントエンドエンジニアによる雑記ブログ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={ZenKakuGothicNew.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
