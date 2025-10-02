// src/hooks/hadithsNew.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../api/axios-client";

// ===============================
// 1️⃣ جلب الأحاديث غير المعالجة (fetched)
// ===============================
export function useHadithsFetched() {
  return useQuery({
    queryKey: ["hadiths/fetched"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/hadiths/fetched");
      return data;
    },
  });
}

// ===============================
// 3️⃣ تحديث الحديث بعد التنظيف
// ===============================
export function useUpdateHadith() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ number, text }) => {
      const { data } = await axiosClient.post("/hadiths/update", { number, text });
      return data;
    },
    onSuccess: () => {
      // إعادة تحميل بيانات fetched و cleaning بعد التحديث
      queryClient.invalidateQueries({ queryKey: ["hadiths/fetched"] });
      queryClient.invalidateQueries({ queryKey: ["hadiths/cleaning"] });
    },
  });
}

// ===============================
// 4️⃣ جلب الأحاديث من السكربت (fetch)
// ===============================
export function useFetchHadiths() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosClient.post("/hadiths/fetch");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hadiths/fetched"] });
    },
  });
}

// ===============================
// 5️⃣ تنظيف الأحاديث (clean)
// ===============================
export function useCleanHadiths() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosClient.post("/hadiths/clean");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hadiths/cleaning"] });
    },
  });
}
