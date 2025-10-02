import React, { useState, useEffect } from "react";
import { FiX, FiArrowLeft, FiArrowRight, FiSave } from "react-icons/fi";

export default function HadithEditModal({ open, onClose, hadith, onSave, onNext, onPrev }) {
  const [text, setText] = useState(hadith.clean_hadith || "");

  useEffect(() => {
    setText(hadith.clean_hadith || "");
  }, [hadith]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 transition-opacity">
      <div className="bg-gradient-to-b from-white to-gray-100 p-6 rounded-xl max-w-lg w-full relative shadow-2xl transform transition-transform duration-300 scale-100">
        {/* زر الإغلاق */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition"
          onClick={onClose}
        >
          <FiX size={24} />
        </button>

        {/* الحديث الأصلي */}
        <div className="mb-4 p-3 rounded bg-gray-50 border-l-4 border-blue-400 shadow-sm">
          <h3 className="font-bold text-lg mb-2 text-blue-600">الحديث الأصلي</h3>
          <p className="text-gray-800 whitespace-pre-wrap">{hadith.text}</p>
        </div>

        {/* النسخة المعدلة */}
        <div className="mb-4 p-3 rounded bg-white border-l-4 border-green-400 shadow-sm">
          <h3 className="font-bold text-lg mb-2 text-green-600">النسخة المعدلة</h3>
          <textarea
            className="w-full border p-2 rounded resize-none focus:outline-green-400 focus:ring-1 focus:ring-green-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
          />
        </div>

        {/* أزرار التحكم */}
        <div className="flex justify-between gap-2 mt-2">
          <button
            className="flex items-center gap-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition shadow"
            onClick={onPrev}
            title="السابق"
          >
            <FiArrowLeft /> السابق
          </button>
          <button
            className="flex items-center gap-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition shadow"
            onClick={onNext}
            title="التالي"
          >
            التالي <FiArrowRight />
          </button>
          <button
            className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition shadow"
            onClick={() => onSave(hadith.number, text)}
            title="حفظ التعديل"
          >
            حفظ <FiSave />
          </button>
        </div>
      </div>
    </div>
  );
}
