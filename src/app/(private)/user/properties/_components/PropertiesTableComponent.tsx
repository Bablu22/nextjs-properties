"use client";

import { deletePropertyFromDB } from "@/actions/properties";
import { Property } from "@prisma/client";
import { Button, Space, Table, TableProps, message } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ShowQueryModal from "./ShowQueryModal";

interface Props {
  properties: Property[];
}

const PropertiesTableComponent = ({ properties }: Props) => {
  const [loading, setLoading] = useState(false);
  const [showQuery, setShowQuery] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const router = useRouter();

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      const res = await deletePropertyFromDB(id);
      if (res.error) throw new Error(res.message);
      message.success("Property deleted successfully");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns: TableProps<Property>["columns"] = [
    {
      title: "Image",
      dataIndex: "images",
      key: "image",
      render: (images, record) => {
        return (
          <Space size="middle" className="bg-white p-1 shadow rounded">
            <Image
              src={images[0]}
              alt={`Property image ${record.id}`}
              width={100}
              height={100}
              placeholder="blur"
              blurDataURL={images[0]}
            />
          </Space>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: Date) => {
        return dayjs(createdAt).format("DD-MM-YYYY");
      },
    },
    {
      title: "Action",
      key: "action",
      render: (value, record) => (
        <Space size="middle">
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => {
                onDelete(record.id);
              }}
              type="dashed"
              key={`delete-${record.id}`}
            >
              <i className="ri-delete-bin-6-line text-rose-600"></i>
            </Button>
            <Button
              type="dashed"
              key={`edit-${record.id}`}
              onClick={() => {
                router.push(`/user/properties/edit-property/${record.id}`);
              }}
            >
              <i className="ri-edit-line "></i>
            </Button>
            <Button
              onClick={() => {
                router.push(
                  `/user/properties/create-property?cloneFrom=${record.id}`
                );
              }}
              type="dashed"
              key={`copy-${record.id}`}
            >
              <i className="ri-file-copy-line"></i>
            </Button>
            <Button
              type="dashed"
              key="id"
              onClick={() => {
                setSelectedProperty(record);
                setShowQuery(true);
              }}
            >
              <i className="ri-eye-line mr-2"></i> Queries
            </Button>
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div className="mt-5 capitalize">
      <Table
        bordered
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={properties}
      />
      {showQuery && (
        <ShowQueryModal
          selectedProperty={selectedProperty}
          setShowQuery={setShowQuery}
          shoQueries={showQuery}
        />
      )}
    </div>
  );
};

export default PropertiesTableComponent;
