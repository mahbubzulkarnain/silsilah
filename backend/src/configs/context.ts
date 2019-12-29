import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { IContext } from "../interfaces/IContext";
import verifyIdToken from "../modules/auth/functions/verifyIdToken";
import { IUser } from "../modules/user/interface";

const ENV = (process.env.NODE_ENV || "dev").toLowerCase();
const DEV = (ENV !== "production") && (ENV !== "prod");

export default async ({ connection, req, res }: ExpressContext): Promise<IContext> => {
  const defaultContext = { req, res, DEV };
  if (connection) {
    return connection.context;
  }
  if (!req || !req.headers) {
    return defaultContext;
  }
  const token = req.headers.authorization || "";

  let user = {} as IUser;
  if (token) {
    user = await verifyIdToken(token);
  }

  return { ...defaultContext, token, user };
};
