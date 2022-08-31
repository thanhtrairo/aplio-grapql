import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID
    name: String
    age: String
    email: String
    password: String
    isAdmin: Boolean
  }

  type Vacation {
    id: ID
    idUser: ID
    reason: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
    vacations: [Vacation]
    vacation(id: ID!): Vacation
  }

  type Mutation {
    createUser(
      name: String
      age: String
      email: String
      password: String
      isAdmin: Boolean
    ): User
    updateUser(
      name: String
      age: String
      email: String
      password: String
      isAdmin: Boolean
    ): User
    createVacation(idUser: ID!, reason: String): Vacation
    updateVacation(idUser: ID!, reason: String): Vacation
  }
`;

export default typeDefs;
