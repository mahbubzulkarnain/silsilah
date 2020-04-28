import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import * as fs from 'fs';
import { merge } from 'lodash';
import context from './configs/context';

const ENV = (process.env.NODE_ENV || 'dev').toLowerCase();
const DEV = (ENV !== 'prod') && (ENV !== 'production');

const dirmodules = `${__dirname}/modules`;
const modules = fs.readdirSync(dirmodules)
  .filter((dir) => {
    const resolversPath = `${dirmodules}/${dir}/resolvers`;
    const schemaPath = `${dirmodules}/${dir}/schema`;

    return fs.existsSync(`${resolversPath}.ts`)
      || fs.existsSync(`${resolversPath}.js`)
      || fs.existsSync(`${schemaPath}.ts`)
      || fs.existsSync(`${schemaPath}.js`);
  });
const resources = (file): { default: any } => {
  const path = `${dirmodules}/${file}`;
  if (fs.existsSync(`${path}.ts`) || fs.existsSync(`${path}.js`)) {
    if (file.includes('datasources')) {
      const Fn = require(path)?.default;
      let fnName = (Fn.toString().match(/function\s+([^\s(]+)/));
      fnName = fnName?.length ? fnName[1] : (new Fn()).constructor.name;
      fnName = fnName?.charAt(0)?.toLowerCase() + fnName?.substring(1);
      return { default: { [fnName]: new Fn() } };
    }
    return require(path);
  }
  if (fs.existsSync(path)) {
    return {
      default : (fs.readdirSync(path)).reduce((result, item) => merge(
        result, (require(`${path}/${item}`)).default,
      ), {}),
    };
  }
  return { default: {} };
};

export const graphqlPath = '/graphql';

export const resolvers = modules.reduce((result, item) => merge(
  result, resources(`${item}/resolvers`).default,
), {});
export const schemaDirectives = modules.reduce((result, item) => merge(
  result, resources(`${item}/directives`).default,
), {});
export const dataSources = (): any => modules.reduce((result, item) => merge(
  result, resources(`${item}/datasources`),
), { default: undefined }).default;

export const typeDefs = modules.map((item) => resources(`${item}/schema`).default);
export const schema = makeExecutableSchema({ resolvers, schemaDirectives, typeDefs });

export default (new ApolloServer({
  context,
  dataSources,
  debug      : DEV,
  playground : { settings: { 'editor.theme': 'light' } },
  schema,
  tracing    : DEV,
}));
