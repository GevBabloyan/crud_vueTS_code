import { createStore } from "vuex";
import localization from "./localization/localization";
import user from "./user/user";
import person from "./persons/person";

export default createStore({
  modules: {
    localization,
    user,
    person,
  },
});
