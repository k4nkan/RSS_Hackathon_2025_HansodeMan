// バックエンドから返されるデータの型を定義
type SearchResult = {
  id: string;
  url: string;
  title: string;
  content: string;
};

type ApiResponse = {
  results: SearchResult[];
};

export const fetchHomeData = async (): Promise<ApiResponse> => {
  const userId = localStorage.getItem("userId");
  const url = "https://rss-hack-hansodeman-471307.an.r.appspot.com/users/home";

  if (userId) {
    console.log("ログイン中のユーザーID:", userId);
  } else {
    console.log(
      "ユーザーIDが見つかりません。デフォルトのニュースを取得します。"
    );
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId }),
    }
  );

  console.log(response);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Backend Error Response Text:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    console.log("✅ Home API response:", data);
    return data;
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return { results: [] };
  }
};
