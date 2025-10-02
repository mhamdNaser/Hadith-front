// src/components/HadithModal.jsx
import React from "react";
import { FiX } from "react-icons/fi";

export default function HadithModal({ open, onClose, title, content }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <FiX size={20} />
        </button>
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
