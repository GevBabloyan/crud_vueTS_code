import * as types from "./types";
import * as mutation_types from "./mutation_types";
import LanguageChange from "@/types/Localization/Language/LanguageChange";
import { setCookie } from "@/plugins/Cookies";

export default {
  [types.ActionTypes.A_CHANGE_LOCALIZATION](
    context: { commit: (arg0: string, arg1: object) => void },
    payload: LanguageChange
  ) {
    setCookie("lng=" + JSON.stringify(payload.selectedLng));
    context.commit(mutation_types.MutationTypes.M_CHANGE_LOCALIZATION, payload);
  },
};
