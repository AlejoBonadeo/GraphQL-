import { ApolloServer } from "apollo-server";
import { Prisma, PrismaClient } from '@prisma/client'
import { typeDefs } from "./schema";
import { Query, Mutation } from "./resolvers";

export interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
}

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Mutation },
  context: { prisma }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url} 🚀`);
});
