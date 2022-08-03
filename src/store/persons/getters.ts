import Person from "@/types/Person/Person";
import Persons from "@/types/Person/Persons";
export default {
  allPersons: (state: Person): Persons[] => {
    return state.persons;
  },
  getPersonByID:
    (state: Person): object =>
    (id: string) => {
      return state.persons.find((person: Persons) => person.id == id);
    },
};
