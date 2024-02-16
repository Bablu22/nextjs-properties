"use client";
import React, { useState } from "react";
import { Button, Form, Modal, Select, Tag } from "antd";
import {
  cities,
  furnishingTypes,
  parkings,
  propertyStatus,
  propertyTypes,
} from "@/lib/constant";
import { usePathname, useRouter } from "next/navigation";

const Filters = ({ searchParams }: { searchParams: any }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const onFinish = (values: any) => {
    const formattedData: any = {};
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        formattedData[key] = values[key];
      }
    });

    const queryString = new URLSearchParams(formattedData).toString();
    router.push(`${pathName}?${queryString}`);
    setShowFilterModal(false);
  };

  const handleModalClose = () => {
    setShowFilterModal(false);
  };

  return (
    <div className="my-3">
      <div className="flex justify-between p-3 rounded border border-solid border-gray-300 items-center">
        <div>
          {Object.keys(searchParams).length === 0 ? (
            <span>No Filtered applied</span>
          ) : (
            <div className="flex items-center space-x-2">
              {Object.keys(searchParams).map((key) => {
                return (
                  <div
                    key={key}
                    className="flex items-center space-x-2 capitalize"
                  >
                    <p className="text-sm font-semibold">{key}:</p>
                    <Tag
                      closable
                      closeIcon
                      onClose={() => {
                        const newSearchParams = { ...searchParams };
                        delete newSearchParams[key];

                        const queryString = new URLSearchParams(
                          newSearchParams
                        ).toString();

                        router.push(`${pathName}?${queryString}`);
                      }}
                      className="flex items-center space-x-3"
                    >
                      <div className="flex items-center space-x-1">
                        {searchParams[key]}
                      </div>
                    </Tag>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => {
              router.push(pathName);
            }}
          >
            Clear
          </Button>
          <Button type="primary" onClick={() => setShowFilterModal(true)}>
            Show Filters
          </Button>
        </div>
      </div>
      <Modal
        title="Select Search Query"
        open={showFilterModal}
        onCancel={handleModalClose}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button
            form="filterForm"
            key="submit"
            htmlType="submit"
            type="primary"
          >
            Apply
          </Button>,
        ]}
      >
        <Form id="filterForm" layout="vertical" onFinish={onFinish}>
          <Form.Item label="Property Type" name="type">
            <Select options={propertyTypes} placeholder="Property Type" />
          </Form.Item>
          <Form.Item label="Property Status" name="status">
            <Select options={propertyStatus} placeholder="Property Status" />
          </Form.Item>
          <Form.Item label="City" name="city">
            <Select options={cities} placeholder="City" />
          </Form.Item>
          <Form.Item label="Parking" name="parking">
            <Select options={parkings} placeholder="Parking" />
          </Form.Item>
          <Form.Item label="Furnishing" name="furnishing">
            <Select options={furnishingTypes} placeholder="Furnishing" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Filters;
