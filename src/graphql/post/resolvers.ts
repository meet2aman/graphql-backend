const queries = {};
const mutations = {
  createPost: async (_: any, {}: {}) => {
    return "randomID";
  },
};

export const resolvers = { queries, mutations };
