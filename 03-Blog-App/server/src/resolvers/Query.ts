import { Post } from "@prisma/client";
import { Context } from "../index";

export const Query = {
  posts: async (_: any, __: any, { prisma }: Context): Promise<Post[]> => {
    const posts = await prisma.post.findMany({
      orderBy: [{ createdAt: "desc" }],
    });
    return posts;
  },
};
