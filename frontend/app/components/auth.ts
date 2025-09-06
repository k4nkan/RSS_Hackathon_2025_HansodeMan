export const login = async (user: string, pass: string): Promise<boolean> => {
  try {
    const res = await fetch(
      "https://rss-hack-hansodeman-471307.an.r.appspot.com/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, pass }),
      }
    );

    if (!res.ok) {
      throw new Error("ログインに失敗しました");
    }

    const data = await res.json();
    console.log("サーバーレスポンス:", data);

    localStorage.setItem("authenticated", "true");

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const signup = async (userId: string, password: string) => {
  try {
    const res = await fetch(
      "https://rss-hack-hansodeman-471307.an.r.appspot.com/users/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userId, pass: password }),
      }
    );

    if (!res.ok) {
      throw new Error("サインアップに失敗しました");
    }

    const data = await res.json();
    console.log("サーバーレスポンス:", data);

    localStorage.setItem("authenticated", "true");

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
