import prisma from "@/config/db";
import { Property } from "@prisma/client";
import { Avatar, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";

const HomeProperties = async ({ searchParams }: { searchParams: any }) => {
  const propertis: Property[] = await prisma.property.findMany({
    where: searchParams,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {propertis.map((property: Property) => (
          <Col key={property.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              style={{ marginBottom: 10 }}
              cover={
                <Image
                  alt={property.name}
                  width="0"
                  height="0"
                  sizes="100vw"
                  style={{ width: "100%", height: "200px" }}
                  src={
                    property.images.length > 0
                      ? property.images[0]
                      : "https://via.placeholder.com/300"
                  }
                  placeholder="blur"
                  blurDataURL={
                    property.images.length > 0
                      ? property.images[0]
                      : "https://via.placeholder.com/300"
                  }
                />
              }
              actions={[
                <Link href={`/property/${property.id}`} passHref key="edit">
                  <i className="ri-eye-fill mr-2"></i>View Details
                </Link>,
              ]}
            >
              <Meta
                title={
                  property.name.length > 20
                    ? property.name.substring(0, 20) + "..."
                    : property.name
                }
                description={property.city + "," + property.landmark}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeProperties;
