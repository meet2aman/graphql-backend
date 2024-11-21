import { CreateUserPayload, UserService } from "../../services/user";

const queries = {
  getUserToken: async (
    _: any,
    payload: { email: string; password: string }
  ) => {
    const token = await UserService.getUserToken({
      email: payload.email,
      password: payload.password,
    });
    return token;
  },
  getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    if (context && context.id) {
      const user = await UserService.getUserById(context.id);
      if (!user) throw new Error(`User not found`);
      return user;
    }
    throw new Error(`Invalid token`);
  },
};
const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const result = await UserService.createUser(payload);
    return result.id;
  },
};

export const resolvers = { queries, mutations };
