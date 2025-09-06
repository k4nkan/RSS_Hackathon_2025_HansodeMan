// app/page.jsx (HomePage.jsx)

import React from "react";
import ResultCard from "./components/ResultCard";
import Link from "next/link";

import data from "./data.json";

const HomePage = () => {
  const searchResults = data.results;

  return (
    <div className="container mx-auto p-4 mb-10">
      <h1 className="text-2xl font-bold mb-6">あなたへのおすすめ</h1>
      {searchResults.length > 0 ? (
        searchResults.map((result, index) => (
          <Link
            key={index}
            // `href`にテンプレートリテラルを使ってidを組み込む
            href={`/detail/${result.id}`}
            passHref
          >
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
