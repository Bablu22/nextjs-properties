import { GetCurrentUserFromDB } from "@/actions/user";
import PageTitle from "@/components/PageTitle";
import prisma from "@/config/db";
import { currentUser } from "@clerk/nextjs";
import { Card } from "antd";
import dayjs from "dayjs";
import React from "react";

const UserAccount = async () => {
  const mongoUser = (await GetCurrentUserFromDB()).data;
  const clerkUser = await currentUser();
  const propertiesPosted = await prisma.property.count({
    where: {
      userId: mongoUser?.id,
    },
  });

  const subscription: any = await prisma.subscription.findFirst({
    where: {
      userId: mongoUser?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="">
      <PageTitle title="My Account" />
      <div>
        {mongoUser && (
          <div className="bg-white rounded-lg border border-solid border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4">User Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="text-sm font-medium">Email:</p>
              <p className="text-sm">{mongoUser.email}</p>
              <p className="text-sm font-medium">Username:</p>
              <p className="text-sm">{mongoUser.username}</p>
              <p className="text-sm font-medium">Properties Posted:</p>
              <p className="text-sm">{propertiesPosted}</p>
              <p className="text-sm font-medium">Registered At:</p>
              <p className="text-sm">
                {dayjs(mongoUser.createdAt).format("DD MMM YYYY HH:mm:ss")}
              </p>
              <p className="text-sm font-medium">Last Login:</p>
              <p className="text-sm">
                {dayjs(clerkUser?.lastSignInAt).format("DD MMM YYYY HH:mm:ss")}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-5">
        {subscription && (
          <div className="bg-white rounded-lg border border-solid border-gray-200 mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Active Subscription</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="text-sm font-medium">Name:</p>
                <p className="text-sm font-bold">{subscription.plan.name}</p>
                <p className="text-sm font-medium">Price:</p>
                <p className="text-sm">${subscription.plan.price}</p>
                <p className="text-sm font-medium">Properties Limit:</p>
                <p className="text-sm">{subscription.plan.propertiesLimit}</p>
                <p className="text-sm font-medium">Images per Property:</p>
                <p className="text-sm">
                  {subscription.plan.imagePerProperties}
                </p>
                <p className="text-sm font-medium">Payment ID:</p>
                <p className="text-sm">{subscription.paymentId}</p>
                <p className="text-sm font-medium">Created At:</p>
                <p className="text-sm">
                  {dayjs(subscription.createdAt).format("DD MMM YYYY HH:mm:ss")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAccount;
