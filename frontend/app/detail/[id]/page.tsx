import React from "react";
import { fetchDummyData } from "../../components/fetchDummyData";

interface DetailPageProps {
  params: { id: string };
}

const DetailPage = async ({ params }: DetailPageProps) => {
  const { id } = params;

  const res = await fetchDummyData();
  const article = res.results.find((item) => item.id === id);

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
      <p className="text-gray-700">{article.content}</p>
    </div>
  );
};

export default DetailPage;
