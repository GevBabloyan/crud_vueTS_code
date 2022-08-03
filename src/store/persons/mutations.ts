import * as mutation_types from "./mutation_types";
import Person from "@/types/Person/Person";
import Persons from "@/types/Person/Persons";
import { getCookie, setCookie } from "@/plugins/Cookies";

export default {
  [mutation_types.MutationTypes.M_ADD_NEW_PERSON](
    state: Person,
    payload: Persons
  ): void {
    const checkCookie: Persons[] | undefined = getCookie("Persons", []);
    const arrayPersonsInCookies: Persons[] =
      checkCookie === undefined ? [] : checkCookie;
    const newId: number = arrayPersonsInCookies.length
      ? +arrayPersonsInCookies[arrayPersonsInCookies.length - 1].id + 1
      : 0;
    payload.id = newId.toString();
    state.persons.push(payload);
    arrayPersonsInCookies.push(payload);
    setCookie("Persons=" + JSON.stringify(arrayPersonsInCookies));
  },
  [mutation_types.MutationTypes.M_DELETE_PERSON](
    state: Person,
    payload: string
  ): void {
    const checkCookie: Persons[] | undefined = getCookie("Persons", []);
    if (checkCookie != undefined) state.persons = checkCookie;
    state.persons = state.persons.filter((persons) => persons.id !== payload);
    setCookie("Persons=" + JSON.stringify(state.persons));
  },
  [mutation_types.MutationTypes.M_UPDATE_PERSON](
    state: Person,
    payload: Persons
  ): void {
    const checkCookie: Persons[] | undefined = getCookie("Persons", []);
    const personsCookie: Persons[] =
      checkCookie != undefined ? checkCookie : [];
    const getKeyPerson = personsCookie.findIndex((x) => x.id === payload.id);
    personsCookie[getKeyPerson] = payload;
    state.persons = personsCookie;
    setCookie("Persons=" + JSON.stringify(personsCookie));
  },
};
