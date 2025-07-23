import VScrollImg from "@/assets/vertical_scroll.png";
import TexturedButton from "../shared/TexturedButton";
import { useGetSutraListQuery } from "@/api/sutras.api";
import ErrorMessage from "../shared/ErrorMessage";
import LanguageSelect from "./LanguageSelect";
import useSutraStore from "@/store/sutraStore";
import CustomBeatLoader from "../shared/CustomBeatLoader";
import SearchBar from "./SearchBar";

const RightScroll = ({ isCommentary }: { isCommentary: boolean }) => {
  const { error, isLoading, data } = useGetSutraListQuery();
  const { sutra_no, setSutraNo } = useSutraStore();

  const handleButtonClick = (sutraNumber: number) => {
    setSutraNo(sutraNumber);
  };

  return (
    <div
      className="h-[650px] w-[250px] bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${VScrollImg})`,
        backgroundSize: "100% 100%",
        minWidth: "250px",
      }}
    >
      <div className="flex flex-col items-center gap-1 mx-8 ml-10 mt-14">

<SearchBar />

        {isCommentary ? (
          <LanguageSelect isCommentary={false} />
        ) : (
          <LanguageSelect isCommentary={true} />
        )}

        {isLoading && <CustomBeatLoader />}
        {error && <ErrorMessage error={error.message} />}

        <div className="flex gap-2 flex-wrap justify-center mt-2">
          <TexturedButton
            selected={sutra_no === 0}
            onClick={() => handleButtonClick(0)}
          >
            Shanti Mantra
          </TexturedButton>

          {data &&
            data.length > 0 &&
            data.map((item) =>
              item.number > 0 ? (
                <TexturedButton
                  key={item.id}
                  selected={item.number === sutra_no}
                  className="p-0 w-10 h-10 pb-1"
                  onClick={() => handleButtonClick(item.number)}
                >
                  {item.number}
                </TexturedButton>
              ) : null
            )}

          <TexturedButton
            selected={sutra_no === -1}
            onClick={() => handleButtonClick(-1)}
          >
            Shanti Mantra
          </TexturedButton>
        </div>
      </div>
    </div>
  );
};

export default RightScroll;
