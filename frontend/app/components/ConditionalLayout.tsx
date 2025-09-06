"use client"; // URLパスを取得するためにクライアントコンポーネントにする

import { usePathname } from "next/navigation";
import Footer from "./footerNav";

// フッターを非表示にしたいページのパスを配列で定義
const pathsToHideFooter = ["/login", "/signup", "/hobby", "/", "/profile/edit"]; // 趣味選択ページのパスを追記してください

export const ConditionalFooter = () => {
  const pathname = usePathname();

  // 現在のパスが非表示対象の配列に含まれている場合は、何も表示しない (nullを返す)
  if (pathsToHideFooter.includes(pathname)) {
    return null;
  }

  // それ以外のページではフッターを表示する
  return <Footer />;
};
