import React, { Suspense } from "react";
import PropertiesTable from "./_components/PropertiesTable";
import PageTitle from "@/components/PageTitle";
import LinkButton from "@/components/LinkButton";
import Loader from "@/components/Loader";
import Filters from "@/components/Filters";

const UserProperties = ({ searchParams }: { searchParams: any }) => {
  const key = JSON.stringify(searchParams);

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitle title="Properties" />
        <LinkButton
          title="Create Property"
          path="/user/properties/create-property"
        />
      </div>
      <div>
        <Filters searchParams={searchParams} />
        <Suspense fallback={<Loader key={key} />}>
          <PropertiesTable searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default UserProperties;
