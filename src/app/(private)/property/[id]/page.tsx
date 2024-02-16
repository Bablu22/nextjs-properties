import LinkButton from "@/components/LinkButton";
import PageTitle from "@/components/PageTitle";
import prisma from "@/config/db";
import { Property } from "@prisma/client";
import { Carousel, Col, Row } from "antd";
import Image from "next/image";
import React from "react";
import PropertyCarousel from "../_component/PropertyCarousel";
import GetTitle from "../_component/GetTitle";
import GetDetails from "../_component/GetDetails";
import QueryModal from "../_component/QueryModal";

interface Props {
  params: {
    id: string;
  };
}

const PropertyPage = async ({ params }: Props) => {
  const { id } = params;
  const property: Property = (await prisma.property.findUnique({
    where: {
      id: id,
    },
  })) as Property;

  return (
    <div>
      <div className="flex items-center justify-between my-2">
        <PageTitle title={property.name} />
        <LinkButton title="Back to properties" path="/" />
      </div>
      <div>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={16} xl={16}>
            <PropertyCarousel images={property.images} />
            <h1 className="text-3xl font-bold text-gray-800 mt-4 capitalize">
              Price: ${property.price}/{property.status}
            </h1>
            <p className="text-gray-600 mt-5 text-sm">{property.description}</p>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <div className="border border-solid border-gray-300 p-5">
              <div className="flex flex-col">
                {GetTitle("Amenities")}
                {GetDetails({
                  name: "Bedrooms",
                  value: property.bedrooms.toString(),
                })}
                {GetDetails({
                  name: "Bathrooms",
                  value: property.bathrooms.toString(),
                })}
                {GetDetails({
                  name: "Parking",
                  value: property.parking.toString(),
                })}
                {GetDetails({
                  name: "Facing",
                  value: property.facing.toString(),
                })}
                {GetDetails({
                  name: "Furnishing",
                  value: property.furnishing.toString(),
                })}
                {GetDetails({
                  name: "Area",
                  value: property.area.toString(),
                })}
                {GetDetails({
                  name: "Floor",
                  value: property.floors.toString(),
                })}
              </div>
              <div className="flex flex-col">
                {GetTitle("Address")}
                {GetDetails({
                  name: "City",
                  value: property.city.toString(),
                })}
                {GetDetails({
                  name: "Landmark",
                  value: property.landmark.toString(),
                })}
                {GetDetails({
                  name: "Pincode",
                  value: property.picode.toString(),
                })}
                {GetDetails({
                  name: "Address",
                  value: property.address.toString(),
                })}
              </div>
              <div className="flex flex-col">
                {property.showOwnerContact ? (
                  <>
                    {GetTitle("Owner Details")}
                    {GetDetails({
                      name: "Name",
                      value: property.ownerName.toString(),
                    })}
                    {GetDetails({
                      name: "Email",
                      value: property.ownerEmail.toString(),
                    })}
                    {GetDetails({
                      name: "Phone",
                      value: property.ownerNumber.toString(),
                    })}
                  </>
                ) : (
                  <QueryModal propertyId={property.id} />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PropertyPage;
