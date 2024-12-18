"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { checkAuth } from "@/utils/checkAuth";

export async function updateUsername(prevState: unknown, formData: FormData) {
    const user = await checkAuth();

    try {
      const username = formData.get("username") as string;
  
      const currentUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { userName: true },
      });
    
      if (currentUser?.userName === username) {
          return {
              message: "Your username is the same as the current one.",
              status: "error",
          };
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          userName: username,
        },
      });
      
      return {
        message: "Username Updated Successfully!",
        status: "success",
      };
    } catch(e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return {
            message: "This username is already taken.",
            status: "error",
          };
        }
      }
      throw e;
    }
}