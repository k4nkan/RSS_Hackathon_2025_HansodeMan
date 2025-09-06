// [変更点] ファイル全体を書き換え

// バックエンドから返されるデータの型定義
type SearchResult = {
  id: string;
  url: string;
  title: string;
  content: string;
};

type ApiResponse = {
  results: SearchResult[];
};

export const fetchHomeData = async (userId: string): Promise<ApiResponse> => {
  try {
    // ユーザーIDをクエリパラメータとして渡す
    const response = await fetch(
      `https://rss-hack-hansodeman-471307.an.r.appspot.com/users/home?user_id=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    const data: ApiResponse = await response.json();
    console.log("✅ Home API response:", data);
    return data;
  } catch (err) {
    console.error("❌ Fetch error:", err);
    // エラー時には空の配列を返すようにして、画面がクラッシュしないようにする
    return { results: [] };
  }
};
