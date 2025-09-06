"use client";
import { useState, useEffect } from "react";
import Select from "react-select";

interface SelectComponentProps {
  options: any[];
}

export default function SelectComponent({ options }: SelectComponentProps) {
  const [mainHobby, setMainHobby] = useState<any>(null);
  const [hobbies, setHobbies] = useState<any[]>([]);

  // クライアント側でのみコンポーネントをレンダリングするための状態
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // コンポーネントがマウントされたら、クライアント側であることを示す
    setIsClient(true);
  }, []);

  const jsonResult = {
    id: "user001",
    main_hobby: mainHobby?.value || null,
    hobbies: hobbies.map((h) => h.value),
  };

  // isClientがtrueのときだけSelectコンポーネントをレンダリング
  if (!isClient) {
    return null; // またはローディングUI
  }

  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          メインの趣味
        </label>
        <Select
          options={options}
          value={mainHobby}
          onChange={setMainHobby}
          isClearable
          placeholder="メインの趣味を検索"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          複数の趣味
        </label>
        <Select
          options={options}
          value={hobbies}
          onChange={(selected) => setHobbies(selected as any[])}
          isMulti
          placeholder="複数の趣味を検索"
        />
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => console.log(jsonResult)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          保存
        </button>
      </div>

      <pre className="mt-6 bg-gray-100 p-3 rounded text-sm overflow-auto">
        {JSON.stringify(jsonResult, null, 2)}
      </pre>
    </>
  );
}
