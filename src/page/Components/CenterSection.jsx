import React from "react";

export default function CenterSection() {
  return (
    <div className="rounded shadow h-screen overflow-hidden flex flex-col">
      <div className="mb-4 flex gap-2 sticky top-0 bg-white z-10 px-2 py-4 shadow justify-between items-center">
        <h2 className="font-bold">الأحاديث بعد الإختبار</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-3"></div>
    </div>
  );
}
