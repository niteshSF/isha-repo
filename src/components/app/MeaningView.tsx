import { useGetMeaningQuery } from "@/api/meaning.api"
import HorizontalScroll from "@/assets/horizontal_scroll.png"
import ErrorMessage from "../shared/ErrorMessage"
import useSutraStore from "@/store/sutraStore"
import useLanguageStore from "@/store/languageStore"
import CustomBeatLoader from "../shared/CustomBeatLoader"
import MultilineText from "../shared/MultilineText"

const MeaningView = () => {
  const { sutra_no } = useSutraStore()
  const { language } = useLanguageStore()
  const { error, isLoading, data } = useGetMeaningQuery(sutra_no, language)

  return (
    <div
      style={{
        backgroundImage: `url(${HorizontalScroll})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* For top padding when scrolling  */}
      <div className="pt-8"></div>
      <div className="h-[170px] max-w-[90%] mx-auto overflow-y-auto">
        {isLoading && <CustomBeatLoader />}
        {error && <ErrorMessage error={"No meaning found"} />}
        <div className="font-semibold text-darkbrown text-lg pl-4">
          {data && <MultilineText text={data.text} />}
        </div>
      </div>

      {/* For bottom padding when scrolling  */}
      <div className="pb-14"></div>
    </div>
  )
}

export default MeaningView
