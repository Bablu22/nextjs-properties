import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { TPropertiesFormStep } from "./PropertiesForm";
import StepButton from "./StepButton";
import { propertyStatus, propertyTypes } from "@/lib/constant";

const Basic = ({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: TPropertiesFormStep) => {
  const onFinish = (value: any) => {
    setFinalValues({ ...finalValues, basic: value });
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="my-5">
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={finalValues.basic}
        className="bg-white shadow p-5 "
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input placeholder="Property name" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input.TextArea rows={6} placeholder="Description" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: "Please input your type!" }]}
            >
              <Select options={propertyTypes} placeholder="Property type" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please input your status!" }]}
            >
              <Select options={propertyStatus} placeholder="Status" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please input your price!" }]}
            >
              <InputNumber placeholder="Price" className="w-full" />
            </Form.Item>
          </Col>
        </Row>
        <StepButton currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </Form>
    </div>
  );
};

export default Basic;
