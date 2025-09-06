export const fetchGeminiSummary = async (context: string) => {
  try {
    const response = await fetch(
      "https://rss-hack-hansodeman-471307.an.r.appspot.com/users/detail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ context }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Gemini API response:", data);
    return data;
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return null;
  }
};
