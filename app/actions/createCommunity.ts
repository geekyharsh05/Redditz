"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { checkAuth } from "@/utils/checkAuth";

export async function createCommunity(prevState: unknown, formData: FormData) {
    const user = await checkAuth();
  
    try {
      const name = formData.get("name") as string;
  
      const data = await prisma.subreddit.create({
        data: {
          name: name,
          userId: user.id,
        },
      })
    
      return {
          message: "Community Created Successfully!",
          status: "success",
          redirectUrl: `/r/${data.name}`,
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return {
            message: "Community name already exists",
            status: "error",
          };
        }
      }
      throw e;
    }
  }