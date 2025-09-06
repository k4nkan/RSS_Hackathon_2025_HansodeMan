import React from "react";
import ResultCard from "./components/ResultCard";
import Link from "next/link";
import data from "./data.json";

// Import the HomeComponent to display the user dashboard
import HomeComponent from "./components/Home";

const HomePage = () => {
  const searchResults = data.results;

  return (
    <div className="container mx-auto p-4 mb-10">
      {/* ユーザーダッシュボードの表示 */}
      <HomeComponent />

      {/* 既存の検索結果セクション */}
      <h1 className="text-2xl font-bold mb-6 mt-10">あなたへのおすすめ</h1>
      {searchResults.length > 0 ? (
        searchResults.map((result, index) => (
          <Link key={index} href={`/detail/${result.id}`} passHref>
            <ResultCard
              title={result.title}
              url={result.url}
              content={result.content}
            />
          </Link>
        ))
      ) : (
        <p>該当する検索結果はありませんでした。</p>
      )}
    </div>
  );
};

export default HomePage;
