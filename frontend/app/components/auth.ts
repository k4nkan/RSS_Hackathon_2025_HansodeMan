// バックエンドからのレスポンスの型を定義
interface LoginResponse {
  message: string;
  user_id: string;
}

interface SignupResponse {
  message: string;
  userId: string;
}

export const login = async (user: string, pass: string): Promise<boolean> => {
  try {
    const res = await fetch(
      "https://rss-hack-hansodeman-471307.an.r.appspot.com/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, pass }),
      }
    );

    if (!res.ok) {
      throw new Error("ログインに失敗しました");
    }

    const data: LoginResponse = await res.json();
    console.log("サーバーレスポンス:", data);

    if (data.user_id) {
      // [変更点] data.user_idを "userId" というキーで保存
      localStorage.setItem("userId", data.user_id);
      localStorage.setItem("authenticated", "true");
      return true;
    }

    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const signup = async (userId: string, password: string) => {
  try {
    const res = await fetch(
      "https://rss-hack-hansodeman-471307.an.r.appspot.com/users/create_user",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userId, pass: password }),
      }
    );

    if (!res.ok) {
      throw new Error("サインアップに失敗しました");
    }

    const data: SignupResponse = await res.json();
    console.log("サーバーレスポンス:", data);

    // [変更点] サインアップで使ったuserIdを "userId" というキーで保存
    localStorage.setItem("userId", userId);
    localStorage.setItem("authenticated", "true");

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
