import React from "react";

export default function TestLogsModal({ isOpen, onClose, logs }) {
  if (!isOpen) return null;

  // تقسيم السطور وتلوين حسب نوع الرسالة
  const renderLogs = logs.split("\n").map((line, idx) => {
    let color = "text-gray-800";
    if (line.startsWith("✅")) color = "text-green-700";
    else if (line.startsWith("❌")) color = "text-red-700";
    else if (line.startsWith("⚠️")) color = "text-yellow-700";

    return (
      <div key={idx} className={color}>
        {line}
      </div>
    );
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full relative shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✖
        </button>
        <h3 className="font-bold text-lg mb-4">نتيجة الاختبار</h3>
        <div className="max-h-96 overflow-y-auto p-2 border rounded bg-gray-50">
          {renderLogs}
        </div>
      </div>
    </div>
  );
}
