import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { useState, useEffect, useRef } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { useGetResultQuery } from "@/api/search.api"

import LightBarImg from "@/assets/dark_bar.png"
import DarkBarImg from "@/assets/dark_bar.png"
import CustomBeatLoader from "../shared/CustomBeatLoader"
import ErrorMessage from "../shared/ErrorMessage"

import useLanguageStore from "@/store/languageStore"
import useModeStore from "@/store/modeStore"
import { Language, Mode, Philosophy } from "@/types/types"
import useSutraStore from "@/store/sutraStore"
import usePhilosophyStore from "@/store/philosophyStore"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const debouncedSearchTerm = useDebounce(searchTerm, 250)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { setLanguage } = useLanguageStore()
  const { setMode } = useModeStore()
  const { setSutraNo } = useSutraStore()
  const { setPhilosophy } = usePhilosophyStore()

  const {
    data: results = [],
    isLoading,
    error,
  } = useGetResultQuery(debouncedSearchTerm, {
    skip: !debouncedSearchTerm,
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSelect = (
    lang: Language,
    mode: string,
    sutraNo: number
  ) => {
    setLanguage(lang)
    setSutraNo(sutraNo)
    if (mode === Mode.Chant) {
      setMode(Mode.Chant)
      navigate("/chant")
    } else if (mode === Mode.TeachMe) {
      setMode(Mode.TeachMe)
      navigate("/teach-me")
    } else if (mode.startsWith("interpretation")) {
      setMode(Mode.LearnMore)
      navigate("/learn-more")
      const pType = mode.split(" - ")[1]
      setPhilosophy(pType as Philosophy)
    }
    setSearchTerm("")
  }

  // 👉 Click outside to clear searchTerm
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSearchTerm("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative mb-4">
      <div className="relative w-full mx-auto">
        <Input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleInputChange}
          className="h-10 pl-10 pr-4 rounded-md w-full placeholder:text-darkbrown placeholder:font-bold"
          style={{
            backgroundImage: `url(${LightBarImg})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-darkbrown" />
      </div>

      {searchTerm !== "" && (
        <div
          ref={dropdownRef}
          className="absolute max-w-5xl top-12 right-10 p-2 flex flex-col gap-1 rounded-md z-10 max-h-[445px] overflow-y-auto"
          style={{
            backgroundImage: `url(${LightBarImg})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          {isLoading && <CustomBeatLoader />}
          {error && <ErrorMessage error="Search failed" />}

          {!isLoading && !error && results.length === 0 && (
            <p className="text-darkbrown text-center font-semibold ">
              No results found
            </p>
          )}

          {results.map((result, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="p-1 w-full text-darkbrown font-semibold hover:text-white flex items-center hover:cursor-pointer hover:rounded-sm"
              style={{
                backgroundImage: `url(${hoveredIndex === index ? DarkBarImg : "none"})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
              onClick={() =>
                handleSearchSelect(result.lang, result.mode, result.sutra_no)
              }
            >
              <p className="whitespace-nowrap overflow-hidden text-ellipsis flex-[8]">
                {result.text}
              </p>
              <p className="flex-[2] text-right ">
                ॥ {result.sutra_no === 0 || result.sutra_no === -1 ? "S" : result.sutra_no} ॥
                <br />
                <span className="text-sm ">({result.mode.replace("_", " ")})</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
