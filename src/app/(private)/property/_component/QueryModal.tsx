"use client";

import { saveQueryToDB } from "@/actions/queries";
import { Button, Form, Input, Modal, message } from "antd";
import React, { useState } from "react";

const QueryModal = ({ propertyId }: { propertyId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const res = await saveQueryToDB({ ...values, propertyId });
      if (res.error) throw new Error(res.error);
      message.success("Query saved successfully");
      handleOk();
    } catch (error: any) {
      console.log(error);

      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button block onClick={showModal} className="mt-5">
        Query for more information
      </Button>
      <Modal
        title="Query Form"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            form="query-form"
            key="submit"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          id="query-form"
          layout="vertical"
          name="query-form"
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Quote Amount"
            name="quoteAmount"
            rules={[
              { required: true, message: "Please input the quote amount!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Please input your message!" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QueryModal;
