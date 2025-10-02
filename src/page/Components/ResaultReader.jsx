import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ResultReader() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ["#4CAF50", "#F44336", "#9E9E9E"];

  useEffect(() => {
    fetch("http://localhost:8000/results")
      .then((res) => {
        if (!res.ok) throw new Error("فشل في جلب البيانات");
        return res.json();
      })
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>جارٍ التحميل...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!results) return <div>لا توجد بيانات</div>;

  return (
    <div className="space-y-6">
      {/* 📌 إحصائيات عامة */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <h3 className="font-bold mb-2">الإحصائيات العامة</h3>
        <p>عدد النتائج: {results.total_count}</p>
        <p>عدد الصحيحة: {results.correct_count}</p>
        <p>عدد الخاطئة: {results.incorrect_count}</p>
        <p>عدد غير المصنفة: {results.unclassified_count}</p>
        <p>الدقة: {results.accuracy}%</p>
      </div>

      {/* 📌 الشارت الدائرية */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-3">نسبة التصنيفات</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={Object.entries(results.summary_distribution || {}).map(
                ([name, value]) => ({ name, value })
              )}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {Object.entries(results.summary_distribution || {}).map(
                (_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                )
              )}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 📌 شارت الأعمدة */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-3">
          توزيع التوقعات الصحيحة مقابل المتوقعة
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={Object.keys(results.correct_distribution || {}).map((key) => ({
              name: key,
              correct: results.correct_distribution[key] || 0,
              predicted: results.predicted_distribution[key] || 0,
            }))}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="correct" fill="#4CAF50" name="الصحيح" />
            <Bar dataKey="predicted" fill="#2196F3" name="المتوقع" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📌 تفاصيل mismatch */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-3">تفاصيل الأخطاء</h3>
        <ul className="list-disc list-inside max-h-64 overflow-auto">
          {Object.entries(results.mismatch_details || {}).map(([key, count]) => (
            <li key={key}>
              {key}: {count} مرة
            </li>
          ))}
        </ul>
      </div>

      {/* 📌 توزيع المواضيع */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-3">توزيع المواضيع</h3>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">الموضوع</th>
              <th className="border border-gray-300 p-2">المتوقع</th>
              <th className="border border-gray-300 p-2">الصحيح</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(results.topics_distribution || {}).map(
              ([topic, counts]) => (
                <tr key={topic}>
                  <td className="border border-gray-300 p-2">{topic}</td>
                  <td className="border border-gray-300 p-2">
                    {counts.predicted_count}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {counts.correct_count}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
