import React from "react";
import PropertiesForm from "../_components/PropertiesForm/PropertiesForm";
import PageTitle from "@/components/PageTitle";
import LinkButton from "@/components/LinkButton";
import { Property } from "@prisma/client";
import prisma from "@/config/db";
import { GetCurrentUserFromDB } from "@/actions/user";

interface Props {
  searchParams: {
    [key: string]: string;
  };
}

const CreateProperty = async ({ searchParams }: Props) => {
  const cloneFrom = searchParams?.cloneFrom || "";

  let property: Property | null = null;
  if (cloneFrom) {
    property = (await prisma.property.findUnique({
      where: {
        id: cloneFrom,
      },
    })) as Property;
  }

  // check user subscriptions and properties count
  const user = await GetCurrentUserFromDB();
  const [subscription, propertiesCount] = (await Promise.all([
    prisma.subscription.findFirst({
      where: {
        userId: user?.data?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.property.count({
      where: {
        userId: user?.data?.id,
      },
    }),
  ])) as any;

  let showForm = true;
  let errorMessage = "";
  if (!subscription && propertiesCount >= 3) {
    showForm = false;
    errorMessage =
      "You have reached the limit of 3 properties. Please purchase a subscription";
  }
  if (!subscription && propertiesCount >= 10) {
    showForm = false;
    errorMessage =
      "You have reached the limit of 10 properties. Please purchase a subscription";
  }

  return (
    <div>
      <div className="flex items-center justify-between my-2">
        <PageTitle title="Properties" />
        <LinkButton title="All Propertis" path="/user/properties" />
      </div>
      {showForm ? (
        <PropertiesForm initialValues={property ? property : {}} />
      ) : (
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold">{errorMessage}</h1>
        </div>
      )}
    </div>
  );
};

export default CreateProperty;
