/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies,import/order, no-unused-expressions */
const dotenv = require('dotenv');

dotenv && dotenv.config();
/* eslint-enable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies,import/order */

/* eslint-disable import/first */
import { AddressInfo } from 'net';
import app, { hostname, port } from './src/app';
import graphql, { graphqlPath } from './src/graphql';
import log from './src/utils/log';

graphql
  .applyMiddleware({
    app,
    cors : {
      credentials : true,
      origin      : true,
    },
    path : graphqlPath,
  });

const server = app
  .listen(port, hostname, (error) => {
    if (error) {
      log.error(error);
    }

    const { port: currentPORT, address: currentHOST } = server.address() as AddressInfo;

    log.info(`>>> 🌎 Open ${currentHOST}:${currentPORT}${graphql.graphqlPath} in your browser.`);
  });
