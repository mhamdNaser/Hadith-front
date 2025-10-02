import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../api/axios-client";

// جلب الأحاديث الغير مختبرة
export function useTestedHadiths() {
  return useQuery({
    queryKey: ["hadiths/tested"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/hadiths/tested");
      return data;
    },
  });
}

// تحديث حديث معين (الموضوع أو العبرة)
export function useUpdateTestedHadith() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, correct_topic, correct_lesson }) => {
      const { data } = await axiosClient.put(`/hadiths/tested/${id}`, {
        correct_topic,
        correct_lesson,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["hadiths/tested"]);
    },
  });
}
