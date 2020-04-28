import { response } from 'graphql-response-parser';
import { IContext } from '../../interfaces/IContext';
import { IResponse } from '../../interfaces/IResponse';
import log from '../../utils/log';
import { ICoupleInput } from '../couple/interface';
import { IPeople, IPeopleInput } from './interface';

export default {
  People : {
    address         : (people: IPeople): string => people.address,
    blood_type      : (people: IPeople): string => people.blood_type,
    date_of_birth   : (people: IPeople): string => people.date_of_birth,
    date_of_death   : (people: IPeople): string => people.date_of_death,
    email           : (people: IPeople): string => people.email,
    gender          : (people: IPeople): string => people.gender,
    nick_name       : (people: IPeople): string => people.nick_name,
    phone           : (people: IPeople): string => people.phone,
    profile_picture : (people: IPeople): string => people.profile_picture,
    sure_name       : (people: IPeople): string => people.sure_name,

    couples : async (people: IPeople, _, { dataSources: { coupleAPI } }: IContext): Promise<unknown[]> => {
      let options: ICoupleInput;
      if (/man/i.test(people.gender)) {
        options = { husband_id: people.id };
      } else {
        options = { wife_id: people.id };
      }
      return coupleAPI.getList(options);
    },
    parent : async (people: IPeople, _, { dataSources: { coupleAPI, childrenAPI } }: IContext): Promise<unknown> => {
      try {
        const { parent_id } = await childrenAPI.getParent({ child_id: people.id });
        return coupleAPI.getById(parent_id);
      } catch (e) {
        log.error(e);
        return {};
      }
    },
  },

  Mutation : {},
  Query    : {
    people : async (
      source,
      { input: { id } }: { input: IPeopleInput },
      { dataSources: { peopleAPI } }: IContext,
    ): Promise<IResponse | Error> => peopleAPI.getById(id),
    peoples : async (
      source,
      { input }: { input: IPeopleInput },
      { dataSources: { peopleAPI } }: IContext,
    ): Promise<IResponse | Error> => response(await peopleAPI.getList(input)),
  },
};
