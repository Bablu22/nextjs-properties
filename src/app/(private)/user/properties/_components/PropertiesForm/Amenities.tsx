import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { TPropertiesFormStep } from "./PropertiesForm";
import StepButton from "./StepButton";
import { facingTypes, furnishingTypes, parkings } from "@/lib/constant";

const Amenities = ({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: TPropertiesFormStep) => {
  const onFinish = (value: any) => {
    setFinalValues({ ...finalValues, amenities: value });
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="my-5">
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={finalValues.amenities}
        className="bg-white shadow p-5 "
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Bedrooms"
              name="bedrooms"
              rules={[{ required: true, message: "Bedrooms is required" }]}
            >
              <InputNumber className="w-full" placeholder="Bedrooms" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Bathrooms"
              name="bathrooms"
              rules={[{ required: true, message: "Bathrooms is required" }]}
            >
              <InputNumber className="w-full" placeholder="Bathrooms" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="belconies"
              label="Belconies"
              rules={[{ required: true, message: "Belconies is required" }]}
            >
              <InputNumber className="w-full" placeholder="Belconies" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Floors"
              name="floors"
              rules={[{ required: true, message: "Floors is required" }]}
            >
              <InputNumber className="w-full" placeholder="Floors" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Area"
              name="area"
              rules={[{ required: true, message: "Area is required" }]}
            >
              <InputNumber className="w-full" placeholder="Area" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="age"
              label="Age"
              rules={[{ required: true, message: "Age is required" }]}
            >
              <InputNumber className="w-full" placeholder="Age" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="parking"
              label="Parking"
              rules={[{ required: true, message: "Please select a parking " }]}
            >
              <Select options={parkings} placeholder="Property type" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="furnishing"
              label="Furnishing"
              rules={[
                { required: true, message: "Please select a furnished type" },
              ]}
            >
              <Select options={furnishingTypes} placeholder="Furnishing" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="facing"
              label="Facing"
              rules={[
                { required: true, message: "Please select a facing type!" },
              ]}
            >
              <Select options={facingTypes} placeholder="Facing" />
            </Form.Item>
          </Col>
        </Row>
        <StepButton currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </Form>
    </div>
  );
};

export default Amenities;
