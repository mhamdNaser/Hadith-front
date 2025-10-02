// src/hooks/hadithsNew.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../api/axios-client";

// ===============================
// 1️⃣ جلب جميع labels
// ===============================
export function useLabel() {
  return useQuery({
    queryKey: ["hadiths/labels"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/hadiths/labels");
      return data;
    },
  });
}

// ===============================
// 2️⃣ إنشاء label جديد
// ===============================
export function useCreateLabel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (labelName) => {
      const { data } = await axiosClient.post("/hadiths/labels", { label: labelName });
      return data;
    },
    onSuccess: () => {
      // بعد ما نضيف label جديد، نعيد تحميل قائمة labels
      queryClient.invalidateQueries(["hadiths/labels"]);
    },
  });
}
