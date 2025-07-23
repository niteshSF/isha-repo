import { Language, Philosophy } from "@/types/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { GLOBAL_CONFIG } from "./config"

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

type TInterpretation = {
  id: number
  text: string
  language: Language
  philosophy: Philosophy
}

const getInterpretation = async (
  number: number,
  lang: Language,
  philosophy: Philosophy,
) => {
  const response = await api.get(
    `/sutras/${GLOBAL_CONFIG.upanishad}/${GLOBAL_CONFIG.section}/${GLOBAL_CONFIG.chapter}/${number}/interpretation?lang=${lang}&phil=${philosophy}`,
  )
  console.log(
    `/sutras/${GLOBAL_CONFIG.upanishad}/${GLOBAL_CONFIG.section}/${GLOBAL_CONFIG.chapter}/${number}/interpretation?lang=${lang}&phil=${philosophy}`,
  )
  console.log(response.data)
  return response.data
}

export const useGetInterpretationQuery = (
  number: number,
  lang: Language,
  philosophy: Philosophy,
) => {
  return useQuery<TInterpretation>({
    queryKey: ["interpretations", 0, number, lang, philosophy],
    queryFn: () => getInterpretation(number, lang, philosophy),
  })
}
