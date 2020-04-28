import { response } from 'graphql-response-parser';
import { IContext } from '../../interfaces/IContext';
import { IResponse } from '../../interfaces/IResponse';
import { ICoupleInput } from './interface';

export default {
  Couple : {
    children : (
      couple: ICoupleInput, _, { dataSources: { childrenAPI } }: IContext,
    ): Promise<unknown[]> => childrenAPI.getList({ parent_id: couple.id }),
    husband : (
      couple: ICoupleInput, _, { dataSources: { peopleAPI } }: IContext,
    ): Promise<unknown> => peopleAPI.getById(couple.husband_id),
    wife : (
      couple: ICoupleInput, _, { dataSources: { peopleAPI } }: IContext,
    ): Promise<unknown> => peopleAPI.getById(couple.wife_id),
  },

  Mutation : {},
  Query    : {
    couple : async (
      source,
      { input: { id } }: { input: ICoupleInput },
      { dataSources: { coupleAPI } }: IContext,
    ): Promise<IResponse | Error> => coupleAPI.getById(id),
    couples : async (
      source,
      { input }: { input: ICoupleInput },
      { dataSources: { coupleAPI } }: IContext,
    ): Promise<IResponse | Error> => response(await coupleAPI.getList(input)),
  },
};
