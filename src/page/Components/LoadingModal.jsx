// Components/LoadingModal.jsx
import React from "react";

export default function LoadingModal({ message = "جاري معالجة الأحاديث..." }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg flex flex-col items-center gap-4">
        {/* مؤشر التحميل - نقاط تتحرك */}
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-75"></span>
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></span>
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></span>
        </div>

        {/* رسالة */}
        <p className="text-gray-700 font-medium text-center">{message}</p>
      </div>
    </div>
  );
}
