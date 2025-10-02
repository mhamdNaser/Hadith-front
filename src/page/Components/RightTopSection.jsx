import React, { useState } from "react";
import {
  useHadithsFetched,
  useUpdateHadith,
  useFetchHadiths,
  useCleanHadiths,
} from "../../hooks/hadithsNew";
import Loading from "../../Components/Loading";
import HadithModal from "./HadithModal";
import HadithEditModal from "./HadithEditModal";

import {
  FiRefreshCw,
  FiTrash2,
  FiDownload,
  FiEye,
  FiEdit,
} from "react-icons/fi";

export default function RightTopSection() {
  const { data: hadiths, isLoading, refetch } = useHadithsFetched();
  const updateHadith = useUpdateHadith();
  const fetchHadiths = useFetchHadiths();
  const cleanHadiths = useCleanHadiths();

  const [viewModal, setViewModal] = useState({
    open: false,
    content: "",
    title: "",
  });
  const [editModal, setEditModal] = useState({ open: false, index: 0 });

  const handleSave = (id, text) => {
    updateHadith.mutate({ number: id, text }, { onSuccess: () => refetch() });
  };

  const handleNext = () => {
      setEditModal((prev) => ({ ...prev, index: prev.index + 1 }));
  };

  const handlePrev = () => {
    if (editModal.index > 0)
      setEditModal((prev) => ({ ...prev, index: prev.index - 1 }));
  };

  const handleFetchAll = () => {
    fetchHadiths.mutate({}, { onSuccess: () => refetch() });
  };

  const handleCleanAll = () => {
    cleanHadiths.mutate({}, { onSuccess: () => refetch() });
  };

  return (
    <div className="h-1/2 flex flex-col">
      {/* أزرار العمليات (ثابتة) */}
      <div className="flex gap-2 mb-4 sticky top-0 bg-white z-10 shadow items-center justify-between">
        <div className="flex gap-2 sticky top-0 bg-white z-10 px-2 py-4 shadow items-center">
          <button
            className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            onClick={handleFetchAll}
            title="fetch new hadiths"
          >
            <FiDownload />
          </button>
          <button
            className="flex items-center gap-1 bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition"
            onClick={handleCleanAll}
            title="clean all hadiths"
          >
            <FiTrash2 />
          </button>
          <button
            className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            onClick={() => refetch()}
            title="refresh all hadiths"
          >
            <FiRefreshCw />
          </button>
        </div>
        <h2 className="font-bold">الأحاديث غير المعالجة</h2>
      </div>
      {/* قائمة الأحاديث مع تمرير مستقل */}
      <div className="flex-1 overflow-y-auto px-3">
        {isLoading ? (
          <Loading />
        ) : hadiths?.length === 0 ? (
          <p className="text-gray-600">لا يوجد أحاديث بحاجة لتصحيح.</p>
        ) : (
          hadiths.map((h, idx) => (
            <div
              key={h.number}
              className="flex items-center gap-2 mb-2 border p-2 rounded bg-gray-50 hover:bg-gray-100 transition shadow-sm"
            >
              <span className="font-bold w-8">{h.number}</span>
              <p className="flex-1 text-gray-800 truncate">{h.text}</p>
              <button
                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition flex items-center gap-1"
                onClick={() =>
                  setViewModal({
                    open: true,
                    content: h.text,
                    title: `الحديث رقم ${h.number}`,
                  })
                }
              >
                <FiEye />
              </button>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition flex items-center gap-1"
                onClick={() => setEditModal({ open: true, index: idx })}
              >
                <FiEdit />
              </button>
            </div>
          ))
        )}
      </div>
      <HadithModal
        open={viewModal.open}
        onClose={() => setViewModal({ open: false, content: "", title: "" })}
        title={viewModal.title}
        content={viewModal.content}
      />
      {editModal.open && (
        <HadithEditModal
          open={editModal.open}
          onClose={() => setEditModal({ open: false })}
          hadith={hadiths[editModal.index]}
          onSave={handleSave}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
}
