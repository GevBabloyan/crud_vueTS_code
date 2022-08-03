import * as types from "./types";
import * as mutation_types from "./mutation_types";

export default {
  [types.ActionTypes.A_ADD_NEW_PERSON](
    context: { commit: (arg0: string, arg1: object) => void },
    payload: object
  ) {
    context.commit(mutation_types.MutationTypes.M_ADD_NEW_PERSON, payload);
  },
  [types.ActionTypes.A_DELETE_PERSON](
    context: { commit: (arg0: string, arg1: number) => void },
    payload: number
  ) {
    context.commit(mutation_types.MutationTypes.M_DELETE_PERSON, payload);
  },
  [types.ActionTypes.A_UPDATE_PERSON](
    context: { commit: (arg0: string, arg1: object) => void },
    payload: object
  ) {
    context.commit(mutation_types.MutationTypes.M_UPDATE_PERSON, payload);
  },
};
