import { useState, useEffect } from "react"
import { useGetSutraQuery } from "@/api/sutras.api"
import HorizontalScroll from "@/assets/horizontal_scroll.png"
import ErrorMessage from "../shared/ErrorMessage"
import useSutraStore from "@/store/sutraStore"
import { useGetTransliterationQuery } from "@/api/transliteration.api"
import useLanguageStore from "@/store/languageStore"
import CustomBeatLoader from "../shared/CustomBeatLoader"
import MultilineText from "../shared/MultilineText"
import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react"

const SutraView = () => {
  const { sutra_no } = useSutraStore()
  const { language } = useLanguageStore()
  const { error, isLoading, data } = useGetSutraQuery(sutra_no)
  const {
    error: transError,
    isLoading: isTransLoading,
    data: transliteration,
  } = useGetTransliterationQuery(sutra_no, language)

  const [open, setOpen] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [fullScreenIndex, setFullScreenIndex] = useState<number | null>(null)

  useEffect(() => {
    fetch("/isha/anusarak.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
        return res.json()
      })
      .then((allData) => {
        const imgs = (allData[String(sutra_no)] || []).map(
          (img: string) => `/isha/${img}`
        )
        setImages(imgs)
      })
      .catch((err) => console.error("Failed to load Anusarak JSON", err))
  }, [sutra_no])

  // Keyboard navigation support (restricted, no looping)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullScreenIndex !== null) {
        if (e.key === "ArrowRight" && fullScreenIndex < images.length - 1) {
          setFullScreenIndex((prev) => (prev !== null ? prev + 1 : prev))
        } else if (e.key === "ArrowLeft" && fullScreenIndex > 0) {
          setFullScreenIndex((prev) => (prev !== null ? prev - 1 : prev))
        } else if (e.key === "Escape") {
          setFullScreenIndex(null)
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [fullScreenIndex, images.length])

  return (
    <div
      style={{
        backgroundImage: `url(${HorizontalScroll})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="pt-6"></div>

      <div className="h-[230px] max-w-[90%] mx-auto overflow-y-auto box-content relative">
        {data && (
          <div className="sticky top-0 z-10 flex justify-between items-center text-lg font-bold text-darkbrown mx-4 -py-2">
            <div className="w-[140px]">
              {!(data.number === 0 || data.number === -1) &&
                images.length > 0 && (
                  <button
                    onClick={() => setOpen(true)}
                    className="flex gap-1 items-center cursor-pointer"
                  >
                    Anusarak <ExternalLink size="20px" />
                  </button>
                )}
            </div>

            <p className="bg-darkbrown rounded-full text-white flex items-center justify-center w-12 h-10">
              {data.number === 0 || data.number === -1 ? "SM" : data.number}
            </p>
          </div>
        )}

        <div className="max-h-[180px] overflow-y-auto px-4">
          {isLoading && <CustomBeatLoader />}
          {error && <ErrorMessage error={error.message} />}
          {data && (
            <div className="font-semibold text-darkorange text-2xl text-center">
              {data.text && <MultilineText text={data.text} />}
            </div>
          )}

          {isTransLoading && <CustomBeatLoader />}
          {transError && <ErrorMessage error={transError.message} />}
          {transliteration && (
            <p className="mt-4 text-darkbrown font-semibold text-center text-xl">
              {transliteration.text && (
                <MultilineText text={transliteration.text} />
              )}
            </p>
          )}
        </div>
      </div>

      <div className="pb-14"></div>

      {/* Modal for Anusarak */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => {
            setOpen(false)
            setFullScreenIndex(null)
          }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close modal button */}
            <button
              onClick={() => {
                setOpen(false)
                setFullScreenIndex(null)
              }}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X size={40} />
            </button>

            {images.length > 0 ? (
              <>
                {fullScreenIndex === null ? (
                  // Grid View
                  <div
                    className={`grid gap-4 w-full h-full items-center justify-center ${
                      images.length === 1
                        ? "grid-cols-1"
                        : images.length === 2
                        ? "grid-cols-2"
                        : "grid-cols-3"
                    }`}
                  >
                    {images.map((img, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-center rounded overflow-hidden cursor-pointer
                          ${
                            images.length === 1
                              ? "w-full h-full p-12"
                              : "w-full h-full max-h-[70vh] p-10"
                          }`}
                        onClick={() =>
                          images.length > 1 ? setFullScreenIndex(i) : null
                        }
                      >
                        <img
                          src={encodeURI(img)}
                          alt={`Sutra ${sutra_no} - Page ${i + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                ) : (

                  // Fullscreen Image with restricted navigation
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
                    {/* Close fullscreen button */}
                    <button
                      onClick={() => setFullScreenIndex(null)}
                      className="absolute top-8 right-8 text-white hover:text-gray-300 z-10"
                    >
                      <X size={40} />
                    </button>

                    {/* Prev button (only if not at first image) */}
                    {images.length > 1 && fullScreenIndex > 0 && (
                      <button
                        onClick={() => setFullScreenIndex(fullScreenIndex - 1)}
                        className="absolute left-12 text-white hover:text-gray-300 z-10"
                      >
                        <ChevronLeft size={50} />
                      </button>
                    )}

                    {/* Next button (only if not at last image) */}
                    {images.length > 1 &&
                      fullScreenIndex < images.length - 1 && (
                        <button
                          onClick={() =>
                            setFullScreenIndex(fullScreenIndex + 1)
                          }
                          className="absolute right-12 text-white hover:text-gray-300 z-10"
                        >
                          <ChevronRight size={50} />
                        </button>
                      )}

                    <img
                      src={encodeURI(images[fullScreenIndex])}
                      alt={`Sutra ${sutra_no} - Fullscreen`}
                      className="max-w-7xl h-full p-10 object-contain"
                    />
                  </div>
                )}
              </>
            ) : (
              <p className="text-center text-white text-xl">
                No Anusarak images available
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SutraView
