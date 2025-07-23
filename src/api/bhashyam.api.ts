import { Philosophy } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GLOBAL_CONFIG } from "./config"

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

type TBhashyam = {
  id: string;
  text: string;
  philosophy: Philosophy;
};

const getBhashyam = async (number: number, philosophy: Philosophy) => {
  const language = "sa"; // Sanskrit language
  const response = await api.get(
    `/sutras/${GLOBAL_CONFIG.upanishad}/${GLOBAL_CONFIG.section}/${GLOBAL_CONFIG.chapter}/${number}/bhashyam?lang=${language}&phil=${philosophy}`
  );
  return response.data;
};

export const useGetBhashyamQuery = (number: number, philosophy: Philosophy) => {
  return useQuery<TBhashyam>({
    queryKey: ["bhashyams", 0, number, philosophy],
    queryFn: () => getBhashyam(number, philosophy),
  });
};
