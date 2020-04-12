const dotenv = require('dotenv');
dotenv && dotenv.config();

import app, { hostname, port } from "./src/app";
import graphql, { graphqlPath } from "./src/graphql";
import log from "./src/utils/log";

graphql
  .applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin     : true,
    },
    path: graphqlPath,
  });

app
  .listen(port, hostname, (error) => {
    if (error) {
      log.error(error);
    }
    log.info(`>>> 🌎 Open ${hostname}:${port}${graphql.graphqlPath} in your browser.`);
  });
