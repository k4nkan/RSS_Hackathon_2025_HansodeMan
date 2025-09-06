"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

interface HobbyOption {
  value: string;
  label: string;
}

interface HobbyTagSelectorProps {
  options: HobbyOption[];
  popularHobbies: string[];
}

export default function HobbyTagSelector({
  options,
  popularHobbies,
}: HobbyTagSelectorProps) {
  const [selectedMainHobby, setSelectedMainHobby] =
    useState<HobbyOption | null>(null);

  const [selectedHobbies, setSelectedHobbies] = useState<HobbyOption[]>([]);

  // [変更点] メインの趣味が選択されているかどうかの判定フラグ
  const isSubHobbyDisabled = selectedMainHobby === null;

  const handlePopularTagClick = (tag: string) => {
    const isAlreadySelected = selectedHobbies.some(
      (hobby) => hobby.value === tag
    );

    if (isAlreadySelected) {
      setSelectedHobbies(
        selectedHobbies.filter((hobby) => hobby.value !== tag)
      );
    } else {
      setSelectedHobbies([...selectedHobbies, { value: tag, label: tag }]);
    }
  };

  const handleMultiSelectChange = (newValue: unknown) => {
    setSelectedHobbies(newValue as HobbyOption[]);
  };

  const jsonResult = {
    main_hobby: selectedMainHobby?.value || null,
    hobbies: selectedHobbies.map((h) => h.value),
  };

  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          メインの趣味
        </label>
        <Select
          instanceId="main-hobby-selector"
          options={options}
          value={selectedMainHobby}
          onChange={(selected) => setSelectedMainHobby(selected as HobbyOption)}
          isClearable
          placeholder="まずメインの趣味を選択してください"
        />
      </div>

      <div className="mb-3">
        <label
          className={`block text-sm font-semibold mb-2 ${
            isSubHobbyDisabled ? "text-gray-400" : "text-gray-700"
          }`}
        >
          複数の趣味
        </label>
        <Select
          instanceId="multi-hobby-selector"
          options={options}
          value={selectedHobbies}
          onChange={handleMultiSelectChange}
          isMulti
          placeholder="メインの趣味を選択すると選べます"
          isDisabled={isSubHobbyDisabled}
        />
      </div>

      <div className="mb-8">
        <h3
          className={`text-sm font-semibold mb-2 ${
            isSubHobbyDisabled ? "text-gray-400" : "text-gray-700"
          }`}
        >
          人気の趣味
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularHobbies.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handlePopularTagClick(tag)}
              disabled={isSubHobbyDisabled}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors border
                ${
                  isSubHobbyDisabled
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : selectedHobbies.some((hobby) => hobby.value === tag)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <pre className="mt-6 bg-gray-100 p-3 rounded text-sm overflow-auto">
        {JSON.stringify(jsonResult, null, 2)}
      </pre>
    </>
  );
}
