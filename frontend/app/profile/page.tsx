import React from "react";

// 仮のユーザーデータ。認証後に実際のデータに置き換える
const user = {
  name: "山田 太郎",
  mbti: "ENFP",
  interests: ["旅行", "映画", "料理", "テクノロジー"],
};

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
        {/* プロフィールヘッダー */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-500 mt-1">@{user.mbti}</p>
        </div>

        {/* 興味・関心セクション */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            興味・関心
          </h2>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col space-y-3">
          <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
            プロフィールを編集
          </button>
          <button className="w-full py-2 px-4 bg-red-500 rounded-lg text-white font-semibold hover:bg-red-600 transition-colors">
            ログアウト
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
