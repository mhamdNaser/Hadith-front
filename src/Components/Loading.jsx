import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
      <span className="text-gray-700 font-medium">جاري تحميل الأحاديث...</span>
    </div>
  );
}
