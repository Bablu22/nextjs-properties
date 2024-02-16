import { Col, Form, Row, Select, Input } from "antd";
import { TPropertiesFormStep } from "./PropertiesForm";
import StepButton from "./StepButton";
import { cities } from "@/lib/constant";

const Location = ({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: TPropertiesFormStep) => {
  const onFinish = (value: any) => {
    setFinalValues({ ...finalValues, location: value });
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="my-5">
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={finalValues.location}
        className="bg-white shadow p-5 "
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="city"
              label="City"
              rules={[
                { required: true, message: "Please input  a city name " },
              ]}
            >
              <Select options={cities} placeholder="Property type" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="picode"
              label="Picode"
              rules={[{ required: true, message: "Please input your picode " }]}
            >
              <Input placeholder=" picode" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="landmark"
              label="Landmark"
              rules={[
                { required: true, message: "Please input your landmark!" },
              ]}
            >
              <Input placeholder="Landmark" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input.TextArea rows={3} placeholder="Address" />
        </Form.Item>

        <StepButton currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </Form>
    </div>
  );
};

export default Location;
