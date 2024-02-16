"use server";

import prisma from "@/config/db";
import { GetCurrentUserFromDB } from "./user";
import { SubscriptionPlan } from "@/app/(private)/user/subscription/_component/SubscriptionPlans";
import { User } from "@prisma/client";

export const saveSubscription = async ({
  paymentId,
  plan,
}: {
  paymentId: string;
  plan: SubscriptionPlan;
}) => {
  try {
    const user = await GetCurrentUserFromDB();
    const payload: any = {
      paymentId: paymentId,
      plan: plan,
      userId: user.data?.id,
    };

    await prisma.subscription.create({
      data: payload,
    });

    return {
      message: "Subscription created successfully ",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
