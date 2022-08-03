import * as mutation_types from "./mutation_types";
import localization from "@/types/Localization/Localization";
import LanguageChange from "@/types/Localization/Language/LanguageChange";

export default {
  [mutation_types.MutationTypes.M_CHANGE_LOCALIZATION](
    state: localization,
    payload: LanguageChange
  ): string {
    state.defoultLng = payload.selectedLng;
    return state.defoultLng;
  },
};
