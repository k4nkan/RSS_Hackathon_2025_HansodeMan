import React from "react";
import HobbyTagSelector from "./HobbyTagSelector";

// 趣味のデータを直接インポート
import hobbiesData from "../../public/hobbies.json";

// react-selectが要求する形式にデータを変換
const options = hobbiesData.map((hobby: string) => ({
  value: hobby,
  label: hobby,
}));

// 人気の趣味リストを50個に増量
const popularHobbies = [
  // 定番
  "読書",
  "映画鑑賞",
  "音楽鑑賞",
  "アニメ",
  "ゲーム",
  "旅行",
  "料理",
  "カフェ巡り",
  "食べ歩き",
  "ショッピング",

  // アウトドア・スポーツ
  "筋トレ",
  "ヨガ・ピラティス",
  "ランニング",
  "散歩",
  "キャンプ",
  "登山",
  "釣り",
  "サイクリング",
  "ドライブ",
  "スポーツ観戦",
  "サッカー",
  "野球",
  "テニス",
  "ゴルフ",
  "スキー・スノボ",
  "ダンス",
  "サウナ",
  "温泉巡り",

  // インドア・創作
  "カラオケ",
  "楽器演奏",
  "写真",
  "イラスト・絵画",
  "ハンドメイド",
  "DIY",
  "ガーデニング",
  "インテリア",
  "ファッション",
  "美容",
  "ブログ・執筆",
  "プログラミング",
  "動画編集",
  "ボードゲーム",

  // 文化・学習
  "美術館巡り",
  "博物館巡り",
  "観劇・ミュージカル",
  "神社仏閣巡り",
  "語学学習",
  "資格勉強",
  "投資・資産運用",
  "ペット",
];

export default function HobbySelectPage() {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg my-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">趣味を選択</h2>
        <p className="text-gray-500">好きなことを話題にしよう。</p>
      </div>
      <HobbyTagSelector options={options} popularHobbies={popularHobbies} />
    </div>
  );
}
