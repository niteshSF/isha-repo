import { useGetSutraQuery } from "@/api/sutras.api"
import HorizontalScroll from "@/assets/horizontal_scroll.png"
import ErrorMessage from "../shared/ErrorMessage"
import useSutraStore from "@/store/sutraStore"
import { useGetTransliterationQuery } from "@/api/transliteration.api"
import useLanguageStore from "@/store/languageStore"
import CustomBeatLoader from "../shared/CustomBeatLoader"
import MultilineText from "../shared/MultilineText"
import { ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"

const SutraView = () => {
  const { sutra_no } = useSutraStore()
  const { language } = useLanguageStore()
  const { error, isLoading, data } = useGetSutraQuery(sutra_no)
  const {
    error: transError,
    isLoading: isTransLoading,
    data: transliteration,
  } = useGetTransliterationQuery(sutra_no, language)

  return (
  <div
    style={{
      backgroundImage: `url(${HorizontalScroll})`,
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
    }}
  >
    {/* Top padding when scrolling */}
    <div className="pt-6"></div>

    {/* Scroll container */}
    <div className="h-[230px] max-w-[90%] mx-auto overflow-y-auto box-content relative">

      {/* Sticky Header inside scroll */}
      {data && (
        <div className="sticky top-0 z-10 flex justify-between items-center text-lg font-bold text-darkbrown mx-4 -py-2">
          <Link to="/anusarak.png" target="_blank" rel="noopener noreferrer">
            <div className="flex gap-1 items-center">
              Anusarak <ExternalLink size="20px" />
            </div>
          </Link>
          <p className="bg-darkbrown rounded-full text-white flex items-center justify-center w-10 h-10">
            {data.number === 0 || data.number === -1 ? "S" : data.number}
          </p>
        </div>
      )}

 <div className="max-h-[180px] overflow-y-auto px-4">
      {/* Sutra Content */}
      {isLoading && <CustomBeatLoader />}
      {error && <ErrorMessage error={error.message} />}
      {data && (
        <div className="font-semibold text-darkorange text-2xl text-center ">
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

    {/* Bottom padding when scrolling */}
    <div className="pb-14"></div>
  </div>
)

}

export default SutraView
