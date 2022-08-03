import * as mutation_types from "./mutation_types";
import User from "@/types/User/User";
import Register from "@/types/User/Register";
import { getCookie, setCookie } from "@/plugins/Cookies";

export default {
  [mutation_types.MutationTypes.M_AUTOLOGIN](state: User) {
    state.logged = true;
  },
  [mutation_types.MutationTypes.M_REGISTER_NEW_USER](
    state: User,
    payload: Register
  ) {
    const usersCookies: Array<any> | undefined = getCookie("Users", []);
    if (usersCookies != undefined) {
      const checkEmaile: Register[] = usersCookies.find((e) => {
        return e.email === payload.email;
      });
      if (checkEmaile == undefined) {
        payload.id = usersCookies.length;
        state.actionsEmailError = false;
        state.users.push(payload);
        const updateUser: Register[] = usersCookies;
        updateUser.push(payload);
        setCookie("Users=" + JSON.stringify(updateUser));
      } else {
        state.actionsEmailError = true;
      }
    }
  },
  [mutation_types.MutationTypes.M_CHECK_LOGIN](state: User, payload: boolean) {
    state.logged = payload;
  },
  [mutation_types.MutationTypes.M_USERS_IN_COOKI](state: User) {
    if (getCookie("Users", []) === undefined)
      setCookie("Users=" + JSON.stringify(state.users));
  },
  [mutation_types.MutationTypes.M_LOGOUT](state: User) {
    state.logged = false;
  },
};
