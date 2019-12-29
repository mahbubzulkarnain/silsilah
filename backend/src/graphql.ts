import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import * as fs from "fs";
import { merge } from "lodash";
import context from "./configs/context";

const ENV = (process.env.NODE_ENV || "dev").toLowerCase();
const DEV = (ENV !== "prod") && (ENV !== "production");

const dirmodules = `${__dirname}/modules`;
const modules = fs.readdirSync(dirmodules)
  .filter(
    (dir) =>
      fs.existsSync(`${dirmodules}/${dir}/resolvers.ts`) ||
      fs.existsSync(`${dirmodules}/${dir}/schema.ts`),
  );
const resources = (file) => {
  const path = `${dirmodules}/${file}`;
  if (fs.existsSync(path + ".ts")) {
    if (file.includes("datasources")) {
      const fn = require(path).default;
      let fnName = (fn.toString().match(/function\s+([^\s(]+)/));
      fnName = (fnName && fnName.length) ? fnName[1] : (new fn()).constructor.name;
      fnName = fnName.charAt(0).toLowerCase() + fnName.substring(1);
      return { default: { [fnName]: new fn() } };
    } else {
      return require(path);
    }
  }
  if (fs.existsSync(path)) {
    return {
      default: (fs.readdirSync(path)).reduce((result, item) => merge(
        result,
        (require(`${path}/${item}`)).default,
      ), {}),
    };
  }
  return { default: {} };
};

export const graphqlPath = "/graphql";

export const resolvers = modules
  .reduce((result, item) => merge(result, resources(item + "/resolvers").default), {});
export const schemaDirectives = modules
  .reduce((result, item) => merge(result, resources(item + "/directives").default), {});
export const typeDefs = modules
  .map((item) => resources(item + "/schema").default);
export const schema = makeExecutableSchema({ resolvers, schemaDirectives, typeDefs });
export const dataSources = () => modules
  .reduce((result, item) => merge(result, resources(item + "/datasources")), {}).default;

export default (new ApolloServer({
  context,
  dataSources,
  debug     : DEV,
  playground: { settings: { "editor.theme": "light" } },
  schema,
  tracing   : DEV,
}));
