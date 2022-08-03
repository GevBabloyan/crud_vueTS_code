import * as types from "./types";
import * as mutation_types from "./mutation_types";
import Login from "@/types/User/Login";
import Register from "@/types/User/Register";
import { deleteCookie, getCookie, setCookie } from "@/plugins/Cookies";

export default {
  [types.ActionTypes.A_REGISTER_NEW_USER](
    context: { commit: (arg0: string, arg1: Register) => void },
    payload: Register
  ) {
    context.commit(mutation_types.MutationTypes.M_REGISTER_NEW_USER, payload);
  },
  [types.ActionTypes.A_USERS_IN_COOKI](context: {
    commit: (arg0: string) => void;
  }) {
    context.commit(mutation_types.MutationTypes.M_USERS_IN_COOKI);
  },
  [types.ActionTypes.A_AUTOLOGIN](context: { commit: (arg0: string) => void }) {
    setCookie("UserLogged=true");
    context.commit(mutation_types.MutationTypes.M_AUTOLOGIN);
  },
  [types.ActionTypes.A_CHECK_LOGIN](
    context: { commit: (arg0: string, arg1: boolean) => void },
    payload: Login
  ) {
    const UsersCookies: Array<any> | undefined = getCookie("Users", []);
    if (UsersCookies != undefined) {
      const checkLoginPassword: Register[] = UsersCookies.find((e) => {
        return e.email === payload.email && e.password === payload.password;
      });
      if (checkLoginPassword !== undefined) {
        setCookie("UserLogged=true");
        context.commit(mutation_types.MutationTypes.M_CHECK_LOGIN, true);
      }
    }
  },
  [types.ActionTypes.A_LOGOUT](context: { commit: (arg0: string) => void }) {
    deleteCookie("UserLogged");
    context.commit(mutation_types.MutationTypes.M_LOGOUT);
  },
};
