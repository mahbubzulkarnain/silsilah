import { response } from "graphql-response-parser";
import { IResponse } from "../../interfaces/IResponse";
import { MOCK_RESULT } from "../../utils/response";

export default {
  Mutation: {
    ping: (obj, args, context, info): IResponse => response(MOCK_RESULT(obj, args, context, info)),
  },
  Query   : {
    ping: (obj, args, context, info): IResponse => response(MOCK_RESULT(obj, args, context, info)),
  },
};
