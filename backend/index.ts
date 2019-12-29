try {
  require("dotenv").config(); // tslint:disable-line:no-var-requires
} catch (e) {
  log.error(errors(e));
}

import { errors } from "graphql-response-parser";
import app, { hostname, port } from "./src/app";
import graphql, { graphqlPath } from "./src/graphql";
import log from "./src/utils/log";

graphql
  .applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: true,
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
