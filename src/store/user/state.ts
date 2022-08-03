import user from "@/types/User/User";
import { getCookie } from "@/plugins/Cookies";

export default <user>{
  logged: getCookie("UserLogged", "string") == undefined ? false : true,
  actionsEmailError: false,
  users: [],
};
