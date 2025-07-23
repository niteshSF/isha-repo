import { useState } from "react";
import LightBarImg from "@/assets/light_bar.png";
import DarkBarImg from "@/assets/dark_bar.png";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useLanguageStore from "@/store/languageStore";
import { Language } from "@/types/types";
// import { Languages } from "lucide-react";

interface LanguageSelectProps {
  isCommentary: boolean; // Pass isCommentary state
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ isCommentary }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [focusedItem, setFocusedItem] = useState<string | null>(null);

  const { language, setLanguage } = useLanguageStore();
  const languageOptions = [
    { value: "sa", label: "Sanskrit" },
    { value: "en", label: "English" },
    { value: "kn", label: "Kannada" },
    { value: "te", label: "Telugu" },
    { value: "ta", label: "Tamil" },
    { value: "hi", label: "Hindi" },
  ];

  const disabledLanguages = !isCommentary ? ["en", "kn", "te", "ta", "hi"] : [];

  const handleItemFocus = (value: string | null) => {
    setFocusedItem(value);
  };

  return (
    <Select onValueChange={(value) => setLanguage(value as Language)}>
      <SelectTrigger
        className="w-[180px] border-none outline-black text-darkbrown hover:text-white font-bold"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          backgroundImage: `url(${isHovered ? DarkBarImg : LightBarImg})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <SelectValue placeholder={languageOptions.find(option => option.value === language)?.label || 'Select Language'} />
      </SelectTrigger>
      <SelectContent
        className="w-[180px] border-none"
        style={{
          backgroundImage: `url(${LightBarImg})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {languageOptions.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            className="focus:text-white font-bold text-darkbrown"
            style={{
              backgroundImage: focusedItem === item.value ? `url(${DarkBarImg})` : "none",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
            onFocus={() => handleItemFocus(item.value)}
            onBlur={() => handleItemFocus(null)}
            disabled={disabledLanguages.includes(item.value)}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelect;
