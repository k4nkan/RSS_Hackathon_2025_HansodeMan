"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react"; // [変更点] useStateをインポート

export default function LoginPage() {
  const router = useRouter();

  // [変更点] 3つの入力値を管理するStateを追加
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/hobby");
  };

  // [変更点] ボタンが有効かどうかの判定ロジック
  // 全ての入力欄が空でなく、かつパスワードが一致しているか
  const isButtonEnabled =
    userId.trim() !== "" &&
    password.trim() !== "" &&
    password === passwordCheck;

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="w-[16rem]">
        <div className="flex w-full gap-[0.5rem] justify-center items-center mb-[2rem] pr-[1rem]">
          <div className="w-[4rem] h-[4rem]">
            <Image src="/logo.png" alt="app-logo" width={64} height={64} />
          </div>
          <h2 className="font-bold text-3xl text-blue-800">News2talk</h2>
        </div>

        <form className="space-y-[1rem]" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700"
            >
              ユーザーID
            </label>
            <input
              type="text"
              id="userId"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ユーザーIDを入力"
              value={userId} // [変更点]
              onChange={(e) => setUserId(e.target.value)} // [変更点]
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              パスワード
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="パスワードを入力"
              value={password} // [変更点]
              onChange={(e) => setPassword(e.target.value)} // [変更点]
            />
          </div>

          <div>
            <label
              htmlFor="passwordCheck"
              className="block text-sm font-medium text-gray-700"
            >
              パスワードの確認
            </label>
            <input
              type="password"
              id="passwordCheck"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="パスワードを再入力"
              value={passwordCheck} // [変更点]
              onChange={(e) => setPasswordCheck(e.target.value)} // [変更点]
            />
          </div>

          <button
            type="submit"
            // [変更点] classNameとdisabledを動的に変更
            className={`w-full rounded-lg py-2 text-white font-semibold transition-colors
              ${
                isButtonEnabled
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
            disabled={!isButtonEnabled}
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}
