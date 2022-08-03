import User from "@/types/User/User";

export default {
  checkLogin: (state: User): boolean => {
    return state.logged;
  },
  checkStateEmailError(state: User): boolean {
    return state.actionsEmailError;
  },
};
