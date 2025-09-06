import React from "react";
import data from "../../data.json";

interface DetailPageProps {
  params: { id: string };
}

const DetailPage = async ({ params }: DetailPageProps) => {
  // await をつけて params を展開
  const { id } = await params;

  // JSONデータからIDに一致する記事を検索
  const article = data.results.find((item) => item.id === id);

  if (!article) {
    return <div>記事が見つかりませんでした。</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline mb-6 block"
      >
        元の記事を読む
      </a>
    </div>
  );
};

export default DetailPage;
