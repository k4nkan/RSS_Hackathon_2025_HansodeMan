"use client";
import React, { useEffect, useState } from "react";
import ResultCard from "../components/ResultCard";
import Link from "next/link";
import { fetchHomeData } from "../components/fetchHomeData";
import LoadingSpinner from "../components/LoadingSpinner";

// ログイン時に保存したユーザーデータの型
interface UserData {
  user_id: string;
}

type SearchResult = {
  id: string;
  url: string;
  title: string;
  content: string;
};

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // まずlocalStorageからユーザー情報を取得して表示に使う
    const userDataString = localStorage.getItem("userId");
    if (userDataString) {
      // user_idだけなので、JSON.parseは不要
      setUserData({ user_id: userDataString });
      console.log("Topページで取得したユーザーID:", userDataString);
    }

    // 次にAPIを呼び出して記事データを取得する
    const loadArticles = async () => {
      try {
        const res = await fetchHomeData(); // fetchHomeDataは内部でlocalStorageからuserIdを取得してAPIを叩く
        if (res && res.results) {
          setSearchResults(res.results);
        }
      } catch (err) {
        console.error("❌ fetchHomeData error:", err);
      } finally {
        // API通信が成功しても失敗しても、必ずローディングを終了する
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return loading ? (
    <div className="flex w-full h-[100vh] justify-center items-center">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="container mx-auto p-4 mb-10">
      <h2 className="text-xl font-semibold mb-4 mt-10">
        {userData?.user_id || "ゲスト"}さんへのおすすめ
      </h2>

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
