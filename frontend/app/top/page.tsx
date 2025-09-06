"use client";
import React, { useEffect, useState } from "react";
import ResultCard from "../components/ResultCard";
import Link from "next/link";
import { fetchDummyData } from "../components/fetchDummyData";
import { fetchHomeData } from "../components/fetchHomeData";
import LoadingSpinner from "../components/LoadingSpinner"; // 1. インポート

type SearchResult = {
  id: string;
  url: string;
  title: string;
  content: string;
  score: number;
  raw_content: string | null;
};

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchDummyData();
        const profile = await fetchHomeData();
        console.log(profile);
        setSearchResults(res.results);
      } catch (err) {
        console.error("❌ fetchDummyData error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // 2. ローディング部分をコンポーネントに置き換え
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
