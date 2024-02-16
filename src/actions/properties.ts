"use server";

import prisma from "@/config/db";
import { GetCurrentUserFromDB } from "./user";
import { Property } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const savePropertyToDB = async (property: Property) => {
  try {
    const userResult: any = await GetCurrentUserFromDB();
    if (userResult.error) {
      throw new Error(userResult.error.message);
    }
    const user = userResult.data;

    const createdProperty = await prisma.property.create({
      data: {
        ...property,
        userId: user?.id,
      },
    });
    console.log(createdProperty);

    if (!createdProperty) {
      return {
        error: "Could not create property",
      };
    }

    revalidatePath("/user/properties");
    return { data: createdProperty, message: "Property created successfully" };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const editPropertyToDB = async (property: Property, id: string) => {
  try {
    const res = await prisma.property.update({
      where: {
        id: id,
      },
      data: property,
    });

    if (!res) {
      return {
        error: "Could not update property",
      };
    }
    revalidatePath("/user/property");
    return {
      data: res,
      message: "Property updated successfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const deletePropertyFromDB = async (id: string) => {
  try {
    await prisma.property.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/user/properties");
    return {
      message: "Property deleted succesfully",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
