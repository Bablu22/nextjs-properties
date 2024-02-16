import { GetCurrentUserFromDB } from "@/actions/user";
import LinkButton from "@/components/LinkButton";
import PageTitle from "@/components/PageTitle";
import prisma from "@/config/db";
import React from "react";
import QueriesTable from "./_components/QueriesTable";
import { Query } from "@prisma/client";

const Queries = async () => {
  const user = await GetCurrentUserFromDB();
  const queries = await prisma.query.findMany({
    where: {
      userId: user?.data?.id,
    },
    include: {
      property: true,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitle title="Queries" />
        <LinkButton
          title="Create Property"
          path="/user/properties/create-property"
        />
      </div>
      <div>
        <QueriesTable queries={queries} />
      </div>
    </div>
  );
};

export default Queries;
