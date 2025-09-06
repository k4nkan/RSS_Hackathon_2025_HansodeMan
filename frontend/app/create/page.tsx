"use client";

import { useState } from "react";
import Link from "next/link";

// デモ用の仮データ
const attributes = ["友人", "初対面", "家族", "同僚", "上司"];
const topics = ["旅行", "映画", "グルメ", "テクノロジー", "スポーツ"];

export default function CreateDeckPage() {
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  // どちらか一方でも選択されていればtrueになる
  const isButtonEnabled = selectedAttribute !== "" || selectedTopic !== "";

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          会話デッキを作成
        </h2>

        {/* 相手の属性セクション */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            相手の属性
          </label>
          <div className="flex flex-wrap gap-2">
            {attributes.map((attribute) => (
              <button
                key={attribute}
                type="button"
                onClick={() => setSelectedAttribute(attribute)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedAttribute === attribute
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }
                `}
              >
                {attribute}
              </button>
            ))}
          </div>
        </div>

        {/* トピックセクション */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            トピック
          </label>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => setSelectedTopic(topic)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedTopic === topic
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }
                `}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* 作成ボタン */}
        <Link
          href={{
            pathname: "/list",
            query: {
              attribute: selectedAttribute,
              topic: selectedTopic,
            },
          }}
          passHref
        >
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold transition-colors
              ${
                isButtonEnabled
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
            disabled={!isButtonEnabled}
          >
            会話デッキを作成
          </button>
        </Link>
      </div>
    </div>
  );
}
