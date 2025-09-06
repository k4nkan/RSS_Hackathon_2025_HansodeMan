export const fetchHomeData = async () => {
  try {
    const response = await fetch(
      "https://rss-hack-hansodeman-471307.an.r.appspot.com/users/home",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Home API response:", data);
    return data;
  } catch (err) {
    console.error("❌ Fetch error:", err);
  }
};
