import { ApolloServer } from 'apollo-server'; // eslint-disable-line import/no-extraneous-dependencies
import { ApolloServerExpressConfig } from 'apollo-server-express';

import * as importGraphql from '../graphql';

export default ({ context, dataSources, schema }: ApolloServerExpressConfig): ApolloServer => {
  const config = {
    context     : context || require('../configs/context').default,
    dataSources : dataSources || importGraphql.dataSources,
    schema      : schema || importGraphql.schema,
  };
  return new ApolloServer(config);
};
