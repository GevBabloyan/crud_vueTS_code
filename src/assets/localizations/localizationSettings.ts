import { localizationEN } from "@/assets/localizations/localizationEN";
import { localizationRU } from "@/assets/localizations/localizationRU";
import LanguageSetting from "@/types/Localization/Language/LanguageSetting";
import Languages from "@/types/Localization/Language/Languages";

const locales: LanguageSetting = {
  EN: localizationEN,
  РУ: localizationRU,
};

export const getCurrentLocalization = (key: string): Languages => {
  return locales[key];
};
