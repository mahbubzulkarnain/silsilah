import { ApolloServer } from "apollo-server";
import { ApolloServerExpressConfig } from "apollo-server-express";

import * as importGraphql from "../graphql";

export default ({ context, dataSources, schema }: ApolloServerExpressConfig) => {
  const config = {
    context    : context ? context : require("../configs/context").default,
    dataSources: dataSources ? dataSources : importGraphql.dataSources,
    schema     : schema ? schema : importGraphql.schema,
  };
  return new ApolloServer(config);
};
