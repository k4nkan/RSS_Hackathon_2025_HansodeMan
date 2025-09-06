"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 既存のユーザーデータを仮定
const initialUser = {
  name: "山田 太郎",
  mbti: "ENFP",
  interests: ["旅行", "映画", "料理", "テクノロジー"],
};

const ProfileEditPage = () => {
  const router = useRouter();
  const [name, setName] = useState(initialUser.name);
  const [mbti, setMbti] = useState(initialUser.mbti);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで実際にデータを更新するAPIを呼び出す
    console.log("Saving data:", {
      name,
      mbti,
    });
    alert("プロフィールを更新しました！");
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSave}
        className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 space-y-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          プロフィールを編集
        </h1>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            名前
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="mbti"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            MBTI
          </label>
          <input
            type="text"
            id="mbti"
            value={mbti}
            onChange={(e) => setMbti(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* [変更点] 興味・関心の入力欄をボタンに変更 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            興味・関心
          </label>
          {/* 現在の興味・関心をタグで表示 */}
          <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-lg border">
            {initialUser.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
          {/* /hobby ページへ移動するリンクをボタンとして表示 */}
          <Link
            href="/hobby"
            className="block w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors text-center"
          >
            趣味を編集する
          </Link>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            保存する
          </button>
          <Link
            href="/profile"
            className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors text-center"
          >
            キャンセル
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditPage;
