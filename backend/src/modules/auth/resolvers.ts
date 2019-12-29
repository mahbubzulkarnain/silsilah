import login from "./functions/login";
import register from "./functions/register";

export default {
  Mutation: {
    login   : async (obj, { input: { email, password } }) => await login(email, password),
    register: async (obj, { input }) => await register(input),
  },
};
