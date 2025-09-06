"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchDummyData } from "../../components/fetchDummyData";
import { fetchGeminiSummary } from "@/app/components/fetchGeminiSummary";
// [変更点 1] 作成したローディングスピナーをインポート
import LoadingSpinner from "../../components/LoadingSpinner";

interface Article {
  id: string;
  title: string;
  url: string;
  content: string;
}

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

const DetailPage = ({ params }: DetailPageProps) => {
  const { id } = React.use(params);

  const [article, setArticle] = useState<Article>();
  const [loading, setLoading] = useState(true);

  // [変更点 2] Stateを修正
  const [summary, setSummary] = useState("");
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);

  const [partnerAge, setPartnerAge] = useState("20代");
  const [partnerRelationship, setPartnerRelationship] = useState("友人");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchDummyData();
        const foundArticle = res.results.find((item) => item.id === id);

        if (foundArticle) {
          setArticle(foundArticle);

          // [変更点 3] 要約取得処理を修正
          setIsSummaryLoading(true);
          // try {
          //   const summaryResult = await fetchGeminiSummary(
          //     foundArticle.content
          //   );
          //   setSummary(
          //     summaryResult?.summary ?? "要約を生成できませんでした。"
          //   );
          // } catch (summaryError) {
          //   console.error("Failed to fetch summary:", summaryError);
          //   setSummary("要約の取得中にエラーが発生しました。");
          // } finally {
          //   setIsSummaryLoading(false);
          // }
        }
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleCreateQuestion = () => {
    console.log("バックエンドに送信するデータ:", {
      summary,
      attributes: {
        age: partnerAge,
        relationship: partnerRelationship,
      },
    });
    alert("質問を作成します（コンソールを確認してください）");
  };

  if (loading) return <div>読み込み中...</div>;
  if (!article) return <div>記事が見つかりませんでした。</div>;

  return (
    <div className="container mx-auto p-8 mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{article.title}</h1>

      <div className="flex items-center gap-6 mb-8">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-semibold"
        >
          元の記事を読む
        </a>
        <Link
          href="/top"
          className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm"
        >
          一覧に戻る
        </Link>
      </div>

      <div className="mb-10 p-6 bg-gray-50 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          この記事の要約
        </h2>
        {/* [変更点 4] UIを条件分岐で切り替え */}
        {isSummaryLoading ? (
          <LoadingSpinner />
        ) : (
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        )}
      </div>

      {/* ...以降のJSXは変更なし... */}
      <div className="mb-10 p-6 bg-white rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          質問を作成する
        </h2>
        <p className="text-gray-600 mb-6">
          要約を元に、誰と話すための質問を作りますか？
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label
              htmlFor="age-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              相手の年代
            </label>
            <select
              id="age-select"
              value={partnerAge}
              onChange={(e) => setPartnerAge(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option>10代</option>
              <option>20代</option>
              <option>30代</option>
              <option>40代</option>
              <option>50代以上</option>
            </select>
          </div>

          <div className="flex-1">
            <label
              htmlFor="relationship-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              相手との関係
            </label>
            <select
              id="relationship-select"
              value={partnerRelationship}
              onChange={(e) => setPartnerRelationship(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option>友人</option>
              <option>恋人</option>
              <option>家族</option>
              <option>同僚</option>
              <option>初対面の人</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCreateQuestion}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
        >
          この内容で質問を作成する
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
