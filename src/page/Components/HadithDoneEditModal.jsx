import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import CreatableSelect from "react-select/creatable";
import { useLabel, useCreateLabel } from "../../hooks/useLabel";

export default function HadithDoneEditModal({
  hadiths,
  index,
  onClose,
  onSave,
  onNavigate,
}) {
  const [currentIndex, setCurrentIndex] = useState(index);
  const [values, setValues] = useState({});

  const hadith = hadiths[currentIndex];

  // جلب labels من DB
  const { data: labels = [] } = useLabel();
  const createLabelMutation = useCreateLabel();

  useEffect(() => {
    setValues({
      correct_topic: hadith.correct_topic || "",
      correct_lesson: hadith.correct_lesson || "",
    });
  }, [currentIndex, hadith]);

  if (!hadith) return null;

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(hadith.id, values);
    if (currentIndex === hadiths.length - 1) {
      onClose();
    }
  };

  const handleNext = () => {
    if (currentIndex < hadiths.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      onNavigate(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      onNavigate(currentIndex - 1);
    }
  };

  // تحويل labels لشكل react-select
  const options = labels.map((l) => ({ value: l.id, label: l.label }));

  // تابع لإضافة موضوع جديد
  const handleCreateTopic = async (inputValue) => {
    try {
      const newLabel = await createLabelMutation.mutateAsync(inputValue);
      // إضافة الموضوع الجديد للقائمة المحلية تلقائيًا
      options.push({ value: newLabel.id, label: newLabel.label });
      // تحديده مباشرة
      handleChange("correct_topic", newLabel.id);
    } catch (error) {
      console.error("Failed to create label:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <FiX size={20} />
        </button>

        <h3 className="font-bold text-lg mb-4">تعديل الحديث ({hadith.id})</h3>

        {/* بيانات غير قابلة للتعديل */}
        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">
            النص الأصلي:
          </label>
          <textarea
            value={hadith.hadith_cleaning}
            readOnly
            className="w-full min-h-fit border p-2 rounded bg-gray-100 text-gray-600"
            rows="6"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">
            الموضوع المتوقع:
          </label>
          <input
            type="text"
            value={hadith.predicted_topic}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 text-gray-600"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">
            الدرس المتوقع:
          </label>
          <input
            type="text"
            value={hadith.predicted_lesson || ""}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 text-gray-600"
          />
        </div>

        {/* الحقول القابلة للتعديل */}
        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">
            الموضوع الصحيح:
          </label>
          <CreatableSelect
            options={options}
            value={
              options.find((o) => o.value === values.correct_topic) || null
            }
            onChange={(selected) =>
              handleChange("correct_topic", selected ? selected.value : "")
            }
            onCreateOption={handleCreateTopic}
            isClearable
            placeholder="اختر موضوع أو أدخل موضوع جديد"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            الدرس الصحيح:
          </label>
          <textarea
            type="text"
            value={values.correct_lesson}
            onChange={(e) => handleChange("correct_lesson", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* أزرار التحكم */}
        <div className="flex justify-between gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="bg-gray-500 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            السابق
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === hadiths.length - 1}
            className="bg-gray-500 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            التالي
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            حفظ
          </button>
        </div>
      </div>
    </div>
  );
}
