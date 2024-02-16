import LinkButton from "@/components/LinkButton";
import PageTitle from "@/components/PageTitle";
import React from "react";
import PropertiesForm from "../../_components/PropertiesForm/PropertiesForm";
import prisma from "@/config/db";

interface Props {
  params: {
    id: string;
  };
}

const EditProperty = async ({ params }: Props) => {
  const property = await prisma.property.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between my-2">
        <PageTitle title="Properties" />
        <LinkButton title="All Propertis" path="/user/properties" />
      </div>
      <PropertiesForm initialValues={property} isEditable={true} />
    </div>
  );
};

export default EditProperty;
