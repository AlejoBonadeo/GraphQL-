import { Post } from "@prisma/client";
import { Context } from "../index";

interface PostCreateArgs {
  post: {
    title: string;
    content: string;
  };
}

interface PostPayload {
  userErrors: { message: string }[];
  post: Post | null;
}

interface PostUpdateArgs {
  id: string;
  post: {
    title?: string;
    content?: string;
  };
}

export const Mutation = {
  postCreate: async (
    _: any,
    { post }: PostCreateArgs,
    { prisma }: Context
  ): Promise<PostPayload> => {
    const { title, content } = post;

    if (!title || !content) {
      return {
        userErrors: [{ message: "Title and content are required" }],
        post: null,
      };
    }
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1,
      },
    });
    return { userErrors: [], post: newPost };
  },
  postUpdate: async (
    _: any,
    { id, post }: PostUpdateArgs,
    { prisma }: Context
  ): Promise<PostPayload> => {
    const { title, content } = post;
    if (!title && !content) {
      return {
        userErrors: [{ message: "Title or content are required" }],
        post: null,
      };
    }
    const postExists = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!postExists) {
      return {
        userErrors: [{ message: "Post does not exist" }],
        post: null,
      };
    }

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: { ...post },
    });
    return { userErrors: [], post: updatedPost };
  },
  postDelete: async (
    _: any,
    { id }: PostUpdateArgs,
    { prisma }: Context
  ): Promise<PostPayload> => {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (!post) {
      return {
        userErrors: [{ message: "Post does not exist" }],
        post: null,
      };
    }
    await prisma.post.delete({ where: { id: Number(id) } });
    return { userErrors: [], post };
  },
};
