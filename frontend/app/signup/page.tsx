"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup } from "../components/auth";

export default function LoginPage() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordCheck) {
      setError("パスワードが一致しません");
      return;
    }

    const success = await signup(userId, password);

    if (success) {
      router.push("/hobby");
    } else {
      setError("サインアップに失敗しました");
    }
  };

  const isButtonEnabled =
    userId.trim() !== "" &&
    password.trim() !== "" &&
    password === passwordCheck;

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="w-[16rem]">
        <div className="flex w-full gap-[0.5rem] justify-center items-center mb-[2rem] pr-[1rem]">
          <div className="w-[4rem] h-[4rem]">
            <Image
              src="/logo.png"
              alt="app-logo"
              width={64}
              height={64}
              priority
            />
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
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className={`w-full rounded-lg py-2 text-white font-semibold transition-colors
              ${
                isButtonEnabled
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
            disabled={!isButtonEnabled}
          >
            サインアップ
          </button>
        </form>
      </div>
    </div>
  );
}
