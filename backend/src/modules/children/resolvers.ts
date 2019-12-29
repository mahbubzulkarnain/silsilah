import { response } from "graphql-response-parser";
import { IContext } from "../../interfaces/IContext";
import { IResponse } from "../../interfaces/IResponse";
import { IChildren, IChildrenInput } from "./interface";

export default {
  Children: {
    child_id: (children: IChildren) => children.child_id,
    parent_id: (children: IChildren) => children.parent_id,

    child    : (children: IChildren, _, { dataSources: { peopleAPI } }: IContext) => peopleAPI
      .getById(children.child_id),
  },

  Mutation: {},
  Query   : {
    children : async (
      source,
      { input: { id } }: { input: IChildrenInput },
      { dataSources: { childrenAPI } }: IContext,
    ): Promise<IResponse | Error> => childrenAPI.getById(id),
    childrens: async (
      source,
      { input }: { input: IChildrenInput },
      { dataSources: { childrenAPI } }: IContext,
    ): Promise<IResponse | Error> => response(await childrenAPI.getList(input)),
  },
};
