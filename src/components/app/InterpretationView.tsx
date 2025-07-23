import LargeHorizontalScroll from "@/assets/large_horizontal_scroll.png";
import ErrorMessage from "../shared/ErrorMessage";
import useSutraStore from "@/store/sutraStore";
import useLanguageStore from "@/store/languageStore";
import usePhilosophyStore from "@/store/philosophyStore";
import { useGetInterpretationQuery } from "@/api/interpretation.api";
import { useGetBhashyamQuery } from "@/api/bhashyam.api";
import CustomBeatLoader from "../shared/CustomBeatLoader";
import MultilineText from "../shared/MultilineText";
import TexturedButton from "../shared/TexturedButton";
import { Philosophy } from "@/types/types";
import { Switch } from "../ui/switch";
import { useState } from "react";

const InterpretationView = () => {
  const { sutra_no } = useSutraStore(); // Get current sutra number
  const { language } = useLanguageStore(); // Get and set language
  const { philosophy, setPhilosophy } = usePhilosophyStore(); // Get and set philosophy

  const [isCommentary, setIsCommentary] = useState(false); // Toggle between Commentary and Bhashyam

  // Fetch Interpretation Data
  const {
    error: interpretationError,
    isLoading: interpretationLoading,
    data: interpretationData,
  } = useGetInterpretationQuery(sutra_no, language, philosophy);

  // Fetch Bhashyam Data
  const {
    error: bhashyamError,
    isLoading: bhashyamLoading,
    data: bhashyamData,
  } = useGetBhashyamQuery(sutra_no, philosophy);

  // Utility function to extract status code
  const getStatusCode = (error: unknown) => {
    if (error && typeof error === "object" && "status" in error) {
      return (error as { status: number }).status;
    }
    return null;
  };

  return (
    <div
      style={{
        backgroundImage: `url(${LargeHorizontalScroll})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Spacing for UI */}
      <div className="pt-8"></div>

      {/* Header Section */}
      <div className="flex justify-center items-center">
        {/* Bhashyam and Commentary Toggle */}
        <div className="flex justify-center items-center mb-1 mr-5">
          <h1
            className={`mr-4 ${!isCommentary ? "font-bold" : ""}`}
            // onClick={() => setLanguage(language("sa"))} // Set to Sanskrit
            style={{ color: "#EF400B", fontWeight: "bold" }}
          >
            Bhashyam
          </h1>
          <Switch
            checked={isCommentary}
            onCheckedChange={(checked) => setIsCommentary(checked)}
          />
          <h1
            className={`ml-4 ${isCommentary ? "font-bold" : ""}`}
            // onClick={() => setLanguage(language("en"))} // Set to English
            style={{ color: "#EF400B", fontWeight: "bold" }}
          >
            Commentary
          </h1>
        </div>

        {/* Philosophy Selection Buttons */}
        <TexturedButton
          selected={philosophy === Philosophy.Advaitha}
          onClick={() => setPhilosophy(Philosophy.Advaitha)}
        >
          Advaita
        </TexturedButton>
        <TexturedButton
          selected={philosophy === Philosophy.Dvaitha}
          onClick={() => setPhilosophy(Philosophy.Dvaitha)}
        >
          Dvaita
        </TexturedButton>
        <TexturedButton
          selected={philosophy === Philosophy.Vishishtadvaita}
          onClick={() => setPhilosophy(Philosophy.Vishishtadvaita)}
        >
          Vishishtadvaita
        </TexturedButton>
        
        <p className="bg-darkbrown rounded-full text-white flex items-center justify-center font-bold w-10 h-10 -mt-2 ml-12">
              {sutra_no === 0 || sutra_no === -1 ? "S" : sutra_no}
            </p>

      </div>

      {/* Content Section */}
      <div className="h-[350px] max-w-[90%] mx-auto overflow-y-auto">
        {isCommentary ? (
          // Commentary Section
          <>
            {interpretationLoading && <CustomBeatLoader />}
            {interpretationError && (
              <ErrorMessage
                error={getStatusCode(interpretationError) === 404
                  ? "No commentary available for the selected sutra."
                  : "An error occurred while fetching commentary."}
              />
            )}
            {interpretationData && (
              <div className="font-semibold text-darkbrown px-4 pt-2 text-lg">
                <MultilineText text={interpretationData.text} gap={4} />
              </div>
            )}
          </>
        ) : (
          // Bhashyam Section
          <>
            {bhashyamLoading && <CustomBeatLoader />}
            {bhashyamError && (
              <ErrorMessage
                error={getStatusCode(bhashyamError) === 404
                  ? "No bhashyam available for the selected sutra."
                  : "An error occurred while fetching bhashyam."}
              />
            )}
            {bhashyamData?.text ? (
              <div className="font-semibold text-darkbrown px-4 pt-2 text-lg">
                <MultilineText text={bhashyamData.text} gap={4} />
              </div>
            ) : (
              <p className="font-semibold text-darkbrown px-4 pt-2 text-lg">
                No bhashyam available for the selected sutra.
              </p>
            )}
          </>
        )}
      </div>

      {/* Bottom Padding */}
      <div className="pb-14"></div>
    </div>
  );
};

export default InterpretationView;
