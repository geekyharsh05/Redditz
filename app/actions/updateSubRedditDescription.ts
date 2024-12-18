"use server";

import prisma from "@/lib/db";
import { checkAuth } from "@/utils/checkAuth";

export async function updateSubRedditDescription(prevState: unknown, formData: FormData) {
    await checkAuth();
    try {
      const subName = formData.get("subName") as string;
      const description = formData.get("description") as string;
  
      await prisma.subreddit.update({
        where: {
          name: subName,
        },
        data: {
          description: description,
        },
      })
  
      return {
        message: "Description Updated Successfully!",
        status: "success",
      }
    } catch {
      return {
        status: "error",
        message: "Sorry something went wrong!",
      };
    }
}