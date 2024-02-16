import prisma from "@/config/db";
import PropertiesTableComponent from "./PropertiesTableComponent";
import { message } from "antd";
import { GetCurrentUserFromDB } from "@/actions/user";

const PropertiesTable = async ({ searchParams }: { searchParams: any }) => {
  const user = await GetCurrentUserFromDB();
  const properties = await prisma.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: user?.data?.id,
      ...searchParams,
    },
  });

  return (
    <div>
      <PropertiesTableComponent properties={properties} />
    </div>
  );
};

export default PropertiesTable;
