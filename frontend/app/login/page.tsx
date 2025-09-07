"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "../components/auth";
import LoadingSpinner from "../components/LoadingSpinner";

export default function LoginPage() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await login(userId, password);
    console.log(success)
    setLoading(false);

    if (success) {
      router.push("/top");
    } else {
      setError("ログインに失敗しました");
    }
  };

  const isButtonEnabled = userId.trim() !== "" && password.trim() !== "";

  return (
    <div className="relative flex h-screen items-center justify-center bg-white">
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
            disabled={!isButtonEnabled || loading}
          >
            ログイン
          </button>
        </form>
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
