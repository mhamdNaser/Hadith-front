import { FiX } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TrainingResultModal({ result, onClose }) {
  if (!result) return null;

  const { logs, summary } = result;

  // تجهيز البيانات للشارت
  const chartData = Object.entries(summary.label2id).map(([label, id]) => ({
    name: label,
    id,
  }));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-xl relative">
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <FiX size={24} />
        </button>

        {/* العنوان */}
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
          نتائج التدريب
        </h2>

        {/* ملخص الأرقام */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="p-3 bg-gray-100 rounded-lg text-center">
            <p className="text-sm text-gray-600">عدد الأمثلة</p>
            <p className="font-semibold">{summary.num_examples}</p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg text-center">
            <p className="text-sm text-gray-600">عدد التصنيفات</p>
            <p className="font-semibold">{summary.num_classes}</p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg text-center">
            <p className="text-sm text-gray-600">عدد العصور</p>
            <p className="font-semibold">{summary.num_epochs}</p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg text-center">
            <p className="text-sm text-gray-600">Batch Size</p>
            <p className="font-semibold">{summary.batch_size}</p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg text-center">
            <p className="text-sm text-gray-600">Learning Rate</p>
            <p className="font-semibold">{summary.learning_rate}</p>
          </div>
        </div>

        {/* الرسم البياني */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">
          التصنيفات
        </h3>
        <div className="w-full h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="id" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* اللوجز */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">
          سجلات التدريب (Logs)
        </h3>
        <div className="bg-gray-900 text-green-400 rounded-lg p-3 h-48 overflow-y-auto text-sm font-mono whitespace-pre-wrap">
          {logs || "لا توجد سجلات"}
        </div>
      </div>
    </div>
  );
}
