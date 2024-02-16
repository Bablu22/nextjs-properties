"use client";
import { Table } from "antd";
import { Property, Query } from "@prisma/client";
import dayjs from "dayjs";

interface Props {
  queries: Query[];
}

const QueriesTable = ({ queries }: Props) => {
  const columns = [
    {
      title: "Property",
      dataIndex: "property",
      key: "property",
      render: (property: Property) => property.name,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quote Amount",
      dataIndex: "quoteAmount",
      key: "quoteAmount",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: Date) => {
        return dayjs(createdAt).format("DD-MM-YYYY hh:mm:ss");
      },
    },
  ];

  return (
    <div>
      <Table bordered dataSource={queries} columns={columns} rowKey="id" />
    </div>
  );
};

export default QueriesTable;
