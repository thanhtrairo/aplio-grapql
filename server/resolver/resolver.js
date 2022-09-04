const resolvers = {
  // QUERY
  Query: {
    users: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllUses(),
    user: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getUserById(id),

    vacations: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllVacations(),
    vacation: async (parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getVacationById(id),
  },

  //   Author: {
  //     books: async ({ id }, args, { mongoDataMethods }) =>
  //       await mongoDataMethods.getAllBooks({ authorId: id }),
  //   },

  // MUTATION
  Mutation: {
    createUser: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createUser(args),
    updateUser: async (parent, args, { mongoDataMethods }) => {
      console.log(args);
      return await mongoDataMethods.updateUser(args);
    },
    createVacation: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createVacation(args),
  },
};

export default resolvers;
