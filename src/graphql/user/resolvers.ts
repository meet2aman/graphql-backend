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
  getCurrentLoggedInUser: async () => {},
};
const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const result = await UserService.createUser(payload);
    console.log(result);
    return result.id;
  },
};

export const resolvers = { queries, mutations };
