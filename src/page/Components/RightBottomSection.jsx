import React, { useState } from "react";
import { useForTestedHadiths } from "../../hooks/useForTestedHadiths";
import axiosClient from "../../api/axios-client";
import { FiPlay } from "react-icons/fi";
import LoadingModal from "./LoadingModal";
import Loading from "../../Components/Loading";

export default function RightBottomSection() {
  const { data: hadiths, isLoading, refetch } = useForTestedHadiths();
  const [isTesting, setIsTesting] = useState(false);
  const [testLogs, setTestLogs] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRunTest = async () => {
    setIsTesting(true);
    setIsModalOpen(true);

    try {
      const hadithIds = hadiths.map((h) => h.id);
      const res = await axiosClient.post("/hadiths/test-db", {
        ids: hadithIds,
      });
      const output = res.data.output || res.data;

      // Simulate loading for smoother animation
      setTimeout(() => {
        setTestLogs(output);
        refetch();
        setIsTesting(false);
      }, 1000);
    } catch (err) {
      setTestLogs({ message: err.response?.data?.error || err.message });
      setIsTesting(false);
    }
  };

  return (
    <div className="h-1/2 flex flex-col">
      {/* زر تشغيل الاختبار */}
      <div className="mb-4 flex gap-2 sticky top-0 bg-white z-10 px-2 py-4 shadow justify-between items-center">
        <button
          className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
          onClick={handleRunTest}
          disabled={isTesting}
          title="تشغيل الاختبار"
        >
          <FiPlay />
        </button>

        <h2 className="font-bold">الأحاديث التي تحتاج تصحيح</h2>
      </div>

      {/* قائمة الأحاديث */}
      <div className="flex-1 overflow-y-auto px-3">
        {isLoading ? (
          <Loading />
        ) : hadiths?.length === 0 ? (
          <p className="text-gray-600">لا يوجد أحاديث بحاجة لتصحيح.</p>
        ) : (
          <ul className="space-y-3">
            {hadiths.map((h, idx) => (
              <li
                key={h.id ?? idx}
                className="flex justify-between items-center border p-2 rounded bg-gray-50 hover:bg-gray-100 transition"
              >
                <span className="text-sm text-gray-800">
                  <span className="font-bold">({h.id ?? idx})</span>{" "}
                  {(h.hadith_cleaning || "").slice(0, 40)}...
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          {isTesting ? (
            <LoadingModal message="⏳ جاري تنفيذ الاختبار، الرجاء الانتظار..." />
          ) : (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 p-4">
              <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg flex flex-col">
                <h2 className="text-xl font-bold text-green-600 mb-2 flex items-center gap-2">
                  ✅ {testLogs?.message || "نتيجة الاختبار"}
                </h2>

                {testLogs?.count !== undefined && (
                  <p className="text-gray-700 mb-4">
                    عدد الأحاديث المعالجة:{" "}
                    <span className="font-semibold">{testLogs.count}</span>
                  </p>
                )}

                {testLogs?.logs && testLogs.logs.length > 0 && (
                  <div className="bg-gray-50 rounded p-3 max-h-64 overflow-y-auto border border-gray-200">
                    <h3 className="font-semibold mb-2 text-gray-800">
                      سجل العمليات:
                    </h3>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      {testLogs.logs.map((log, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-500 font-bold">•</span>
                          <span>{log}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  className="mt-4 self-end bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  onClick={() => setIsModalOpen(false)}
                >
                  إغلاق
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
