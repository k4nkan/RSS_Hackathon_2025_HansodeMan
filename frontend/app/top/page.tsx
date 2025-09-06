"use client";
import React, { useEffect, useState } from "react";
import ResultCard from "../components/ResultCard";
import Link from "next/link";
import { fetchHomeData } from "../components/fetchHomeData";
import LoadingSpinner from "../components/LoadingSpinner";

type SearchResult = {
  id: string;
  url: string;
  title: string;
  content: string;
};

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        // [変更点] ダミーデータ取得を削除し、実際のAPIを呼び出す
        // TODO: ログイン機能実装後、実際のユーザーIDを渡すように修正
        const res = await fetchHomeData("testuser1");

        if (res && res.results) {
          setSearchResults(res.results);
        }
      } catch (err) {
        console.error("❌ fetchHomeData error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return loading ? (
    <div className="flex w-full h-[100vh] justify-center items-center">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="container mx-auto p-4 mb-10">
      <h2 className="text-xl font-semibold mb-4 mt-10">あなたへのおすすめ</h2>
      {searchResults.length > 0 ? (
        searchResults.map((result) => (
          <Link key={result.id} href={`/detail/${result.id}`} passHref>
            <ResultCard title={result.title} />
          </Link>
        ))
      ) : (
        <p>該当する検索結果はありませんでした。</p>
      )}
    </div>
  );
};

export default HomePage;
