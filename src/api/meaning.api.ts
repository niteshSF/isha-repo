import { Language } from "@/types/types"
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

type TMeaning = {
  id: number
  text: string
  language: Language
}

const getMeaning = async (sutra_no: number, lang: Language) => {
  const response = await api.get(`/sutras/${GLOBAL_CONFIG.upanishad}/${GLOBAL_CONFIG.section}/${GLOBAL_CONFIG.chapter}/${sutra_no}/meaning?lang=${lang}`)
  return response.data
}

export const useGetMeaningQuery = (sutra_no: number, lang: Language) => {
  return useQuery<TMeaning>({
    queryKey: ["meanings", 0, sutra_no, lang],
    queryFn: () => getMeaning(sutra_no, lang),
  })
}
