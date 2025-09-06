"use client";

import { useState, useEffect } from "react"; // useEffectを追加
import Link from "next/link";
import dynamic from "next/dynamic"; // dynamic importを使用

// react-selectをクライアント側でのみ読み込む（SSR時のエラー防止）
const Select = dynamic(() => import("react-select"), { ssr: false });

// react-selectで使う選択肢の型定義
interface HobbyOption {
  value: string;
  label: string;
}

export default function CreateDeckPage() {
  // 選択されたトピックの型をHobbyOption | nullに変更
  const [selectedTopic, setSelectedTopic] = useState<HobbyOption | null>(null);
  // hobbies.jsonから読み込んだデータを格納するState
  const [topicOptions, setTopicOptions] = useState<HobbyOption[]>([]);

  // ページが読み込まれた時に一度だけhobbies.jsonをフェッチする
  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const response = await fetch("/hobbies.json"); // publicフォルダのjsonを読み込む
        const data: string[] = await response.json();
        // react-selectで使える { value, label } の形式に変換
        const options = data.map((hobby) => ({
          value: hobby,
          label: hobby,
        }));
        setTopicOptions(options);
      } catch (error) {
        console.error("趣味データの読み込みに失敗しました:", error);
      }
    };

    fetchHobbies();
  }, []); // 空の依存配列で初回レンダリング時のみ実行

  // ボタンが有効かどうかの判定を更新
  const isButtonEnabled = selectedTopic !== null;

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          話題を抽出
        </h2>

        {/* トピックセクション */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            トピック
          </label>
          {/* ボタンの代わりにSelectコンポーネントを配置 */}
          <Select
            options={topicOptions}
            value={selectedTopic}
            onChange={(selected) =>
              setSelectedTopic(selected as HobbyOption | null)
            }
            placeholder="トピックを検索または選択..."
            isClearable
            instanceId="topic-select" // Hydrationエラーを防ぐためのユニークID
          />
        </div>

        {/* 作成ボタン */}
        <Link
          href={{
            pathname: "/list",
            query: {
              // 選択されたオブジェクトから値を取り出す
              topic: selectedTopic?.value || "",
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
            記事を出力
          </button>
        </Link>
      </div>
    </div>
  );
}
