import Localization from "@/types/Localization/Localization";
import { getCookie } from "@/plugins/Cookies";

export default <Localization>{
  defoultLng:
    getCookie("lng", "string") === undefined
      ? "EN"
      : getCookie("lng", "string"),
  localizationInfo: {},
};
