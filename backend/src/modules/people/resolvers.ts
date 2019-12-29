import { response } from "graphql-response-parser";
import { IContext } from "../../interfaces/IContext";
import { IResponse } from "../../interfaces/IResponse";
import { ICoupleInput } from "../couple/interface";
import { IPeople, IPeopleInput } from "./interface";

export default {
  People: {
    address        : (people: IPeople) => people.address,
    blood_type     : (people: IPeople) => people.blood_type,
    date_of_birth  : (people: IPeople) => people.date_of_birth,
    date_of_death  : (people: IPeople) => people.date_of_death,
    email          : (people: IPeople) => people.email,
    gender         : (people: IPeople) => people.gender,
    nick_name      : (people: IPeople) => people.nick_name,
    phone          : (people: IPeople) => people.phone,
    profile_picture: (people: IPeople) => people.profile_picture,
    sure_name      : (people: IPeople) => people.sure_name,

    couples        : async (people: IPeople, _, { dataSources: { coupleAPI } }: IContext) => {
      let options: ICoupleInput = {};
      if (/man/i.test(people.gender)) {
        options = { husband_id: people.id };
      } else {
        options = { wife_id: people.id };
      }
      return coupleAPI.getList(options);
    },
    parent         : async (people: IPeople, _, { dataSources: { coupleAPI, childrenAPI } }: IContext) => {
      try {
        const { parent_id } = await childrenAPI.getParent({ child_id: people.id });
        return coupleAPI.getById(parent_id);
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return {};
      }
    },
  },

  Mutation: {},
  Query   : {
    people : async (
      source,
      { input: { id } }: { input: IPeopleInput },
      { dataSources: { peopleAPI } }: IContext,
    ): Promise<IResponse | Error> => peopleAPI.getById(id),
    peoples: async (
      source,
      { input }: { input: IPeopleInput },
      { dataSources: { peopleAPI } }: IContext,
    ): Promise<IResponse | Error> => response(await peopleAPI.getList(input)),
  },
};
