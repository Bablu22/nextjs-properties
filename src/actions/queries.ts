"use server";

import prisma from "@/config/db";
import { GetCurrentUserFromDB } from "./user";

export const saveQueryToDB = async (query: any) => {
  try {
    const user = await GetCurrentUserFromDB();
    await prisma.query.create({
      data: {
        userId: user?.data?.id,
        ...query,
      },
    });

    return {
      data: query,
      message: "Query saved successfully",
      success: true,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const getQueryByPropertyId = async (propertyId: string) => {
  try {
    const queries = await prisma.query.findMany({
      where: {
        propertyId: propertyId,
      },
    });
    return {
      data: queries,
      success: true,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
