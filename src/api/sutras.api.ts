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
// const upanishad = process.env.UPANISHAD
// const chapter = process.env.CHAPTER 

type TSutra = {
  id: number
  // chapter: number
  number: number
  text: string
}
type TSutraList = {
  id: number
  number: number
}

const getSutra = async (number: number) => {
  const response = await api.get(`/sutras/${GLOBAL_CONFIG.upanishad}/${GLOBAL_CONFIG.section}/${GLOBAL_CONFIG.chapter}/${number}`)
  return response.data
}

export const useGetSutraQuery = (number: number) => {
  return useQuery<TSutra>({
    queryKey: ["sutras", number],
    queryFn: () => getSutra(number),
  })
}

const getSutraList = async () => {
  const response = await api.get(`/sutras/?project_name=${GLOBAL_CONFIG.upanishad}`)
  return response.data
}

export const useGetSutraListQuery = () => {
  return useQuery<TSutraList[]>({
    queryKey: ["sutras"],
    queryFn: getSutraList,
  })
}
