import React, { useState } from "react";
import {
  useTestedHadiths,
  useUpdateTestedHadith,
} from "../../hooks/useTestedHadiths";
import HadithDoneEditModal from "./HadithDoneEditModal";
import { FiEdit3 } from "react-icons/fi";
import Loading from "../../Components/Loading";
import { FiPlay } from "react-icons/fi";

export default function LeftSection() {
  const { data: hadiths, isLoading } = useTestedHadiths();
  const updateHadith = useUpdateTestedHadith();
  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="mb-4 flex gap-2 sticky top-0 bg-white z-10 px-2 py-4 shadow justify-between items-center">
        <h2 className="font-bold">الأحاديث بعد الإختبار</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-3">
        {isLoading ? (
          <Loading />
        ) : hadiths?.length === 0 ? (
          <p className="text-gray-600">لا يوجد أحاديث تم إختبارها.</p>
        ) : (
          <ul className="space-y-3">
            {hadiths.map((h, idx) => (
              <li
                key={h.id ?? idx}
                className="flex justify-between items-center border p-2 rounded bg-gray-50 hover:bg-gray-100 transition"
              >
                <span className="text-sm text-gray-800">
                  <span className="font-bold">({h.id ?? idx})</span>{" "}
                  {(h.hadith_cleaning || "").slice(0, 200)}...
                </span>
                <div className="flex items-center gap-2">
                  <button
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    onClick={() => setCurrentIndex(idx)}
                  >
                    <FiEdit3 />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {currentIndex !== null && (
        <HadithDoneEditModal
          hadiths={hadiths}
          index={currentIndex}
          onClose={() => setCurrentIndex(null)}
          onSave={(id, values) =>
            updateHadith.mutate({
              id,
              correct_topic: values.correct_topic,
              correct_lesson: values.correct_lesson,
            })
          }
          onNavigate={setCurrentIndex}
        />
      )}
    </div>
  );
}
