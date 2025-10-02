import React, { useState } from "react";
import ResultReader from "./ResaultReader";
import LoadingModal from "./LoadingModal";
import TrainingResultModal from "./TrainingResultModal";
import axiosClient from "../../api/axios-client";

export default function CenterSection() {
  const [loading, setLoading] = useState(false);
  const [trainingResult, setTrainingResult] = useState(null);

  const startTraining = async () => {
    setLoading(true);
    setTrainingResult(null);

    try {
      const response = await axiosClient.post("/train"); // ✅ استدعاء API
      const data = response.data; // axios بيرجع JSON مباشرة

      if (data.success) {
        setTrainingResult({
          logs: data.logs || "",
          summary: data.summary || {},
        });
      } else {
        alert(`حدث خطأ أثناء التدريب: ${data.error || "غير معروف"}`);
        console.error(data.trace);
      }
    } catch (error) {
      alert(`حدث خطأ في الاتصال بالخادم: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded shadow h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <div className="mb-4 flex gap-2 sticky top-0 bg-white z-10 px-2 py-4 shadow justify-between items-center">
        <h2 className="font-bold flex items-center gap-2">
          📊 الأحاديث بعد الإختبار
        </h2>
        <button
          onClick={startTraining}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          بدء التدريب
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-3">
        <ResultReader />
      </div>

      {/* Modals */}
      {loading && <LoadingModal message="جاري عملية التدريب..." />}
      {!loading && trainingResult && (
        <TrainingResultModal
          result={trainingResult}
          onClose={() => setTrainingResult(null)}
        />
      )}
    </div>
  );
}
