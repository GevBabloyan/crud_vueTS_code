import Localization from "@/types/Localization/Localization";
import { getCurrentLocalization } from "@/assets/localizations/localizationSettings";
import { getCookie } from "@/plugins/Cookies";
import Languages from "@/types/Localization/Language/Languages";

export default {
  localizationInfo: (state: Localization): Languages => {
    state.localizationInfo = getCurrentLocalization(state.defoultLng);
    return state.localizationInfo;
  },
  getLocalizationSelected(state: Localization): string {
    const checkLng: string | undefined = getCookie("lng", "string");
    if (checkLng != undefined) state.defoultLng = checkLng as string;
    return state.defoultLng;
  },
};
