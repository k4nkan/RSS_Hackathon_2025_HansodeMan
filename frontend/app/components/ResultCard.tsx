import React from "react";
import { PiCaretRightBold } from "react-icons/pi";
import { FiLink } from "react-icons/fi";

interface ResultCardProps {
  title: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ title }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mb-4 border border-gray-100 flex items-start space-x-4 cursor-pointer hover:bg-gray-50 transition-colors">
      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-500">
        <FiLink className="text-sm" />
      </div>

      <div className="flex-1">
        <h2 className="text-base font-semibold text-gray-900 mb-1">{title}</h2>
      </div>

      <div className="flex-shrink-0 flex items-center">
        <span className="text-blue-500 flex items-center space-x-1 text-xs font-medium">
          <span className="hidden sm:inline">Read more</span>
          <PiCaretRightBold className="text-lg text-gray-400" />
        </span>
      </div>
    </div>
  );
};

export default ResultCard;
