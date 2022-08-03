import Person from "@/types/Person/Person";
import { getCookie } from "@/plugins/Cookies";

export default <Person>{
  persons:
    getCookie("Persons", []) === undefined ? [] : getCookie("Persons", []),
};
