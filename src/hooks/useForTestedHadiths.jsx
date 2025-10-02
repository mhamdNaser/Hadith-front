import { useQuery } from "@tanstack/react-query";
import axiosClient from "../api/axios-client";

// جلب الأحاديث الغير مختبرة
export function useForTestedHadiths() {
  return useQuery({
    queryKey: ["hadiths/fortested"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/hadiths/fortested");
      return data;
    },
  });
}
