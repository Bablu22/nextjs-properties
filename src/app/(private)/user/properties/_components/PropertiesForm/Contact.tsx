import { Form, Input, Select, Row, Col, message } from "antd";
import { TPropertiesFormStep } from "./PropertiesForm";
import StepButton from "./StepButton";
import { uploadImageToFirebase } from "@/lib/upload-media";
import { editPropertyToDB, savePropertyToDB } from "@/actions/properties";
import { useParams, useRouter } from "next/navigation";

const Contact = ({
  currentStep,
  setCurrentStep,
  finalValues,
  loading,
  setLoading,
  isEditable = false,
}: TPropertiesFormStep) => {
  const router = useRouter();
  const { id } = useParams();

  const onFinish = async (value: any) => {
    const tempFinalValues = { ...finalValues, contact: value };
    try {
      setLoading(true);
      const tempMedia = tempFinalValues.media;
      const newImageUrls = await uploadImageToFirebase(
        tempMedia.newlyUpdatedFiles
      );

      tempMedia.images = [...tempMedia.images, ...newImageUrls];

      tempFinalValues.media = tempMedia;
      const valuedToUpload = {
        ...tempFinalValues.basic,
        ...tempFinalValues.location,
        images: tempFinalValues.media.images,
        ...tempFinalValues.contact,
        ...tempFinalValues.amenities,
      };
      let res = null;
      if (isEditable) {
        res = await editPropertyToDB(valuedToUpload, id as string);
      } else {
        res = await savePropertyToDB(valuedToUpload);
      }

      if (res.error) throw new Error(res.error);
      message.success("Property saved successfully");
      router.push("/user/properties");
    } catch (error: any) {
      console.log(error.message);

      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-5">
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={finalValues.contact}
        className="bg-white shadow p-5"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Owner Name"
              name="ownerName"
              rules={[
                {
                  required: true,
                  message: "Please input the owner name!",
                },
              ]}
            >
              <Input placeholder="Owner Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Owner Number"
              name="ownerNumber"
              rules={[
                {
                  required: true,
                  message: "Please input the owner number!",
                },
              ]}
            >
              <Input placeholder="Owner Number" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Owner Email"
              name="ownerEmail"
              rules={[
                {
                  required: true,
                  message: "Please input the owner email!",
                },
              ]}
            >
              <Input placeholder="Owner Email" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="showOwnerContact"
              label="Show Owner Contact"
              rules={[
                {
                  required: true,
                  message: "Please input the show owner contact!",
                },
              ]}
            >
              <Select placeholder="Select">
                <Select.Option value={true}>Show owner details</Select.Option>
                <Select.Option value={false}>
                  Don not show owner details
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <StepButton
          loading={loading}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          isLastItem={true}
        />
      </Form>
    </div>
  );
};

export default Contact;
