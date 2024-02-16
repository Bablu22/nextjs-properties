"use server";

import prisma from "@/config/db";
import { currentUser } from "@clerk/nextjs";
import { User } from "@prisma/client";

export const GetCurrentUserFromDB = async () => {
  try {
    const clerkuser = await currentUser();

    const mongoUser = await prisma.user.findUnique({
      where: {
        clerkUserId: clerkuser?.id,
      },
    });

    if (mongoUser) return { data: mongoUser };

    const result = await prisma.user.create({
      data: {
        clerkUserId: clerkuser?.id,
        username: clerkuser?.username,
        email: clerkuser?.emailAddresses[0].emailAddress,
        profilePic: clerkuser?.imageUrl,
      } as User,
    });

    return {
      data: result,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
