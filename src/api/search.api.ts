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

type TResult = {
  text: string
  sutra_no: number
  mode: string
  lang: Language
}

const getResult = async (term: string) => {
  const response = await api.get(`search/${GLOBAL_CONFIG.upanishad}/${term}`)
  return response.data
}

export const useGetResultQuery = (term: string, p0: { skip: boolean }) => {
  return useQuery<TResult[]>({
    queryKey: ["search", term],
    queryFn: () => getResult(term),
  })
}
