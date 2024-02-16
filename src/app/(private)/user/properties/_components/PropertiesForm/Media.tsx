import React, { useState, useEffect } from "react";
import { TPropertiesFormStep } from "./PropertiesForm";
import StepButton from "./StepButton";
import { Form, Upload } from "antd";
import Image from "next/image";
import { GetCurrentUserFromDB } from "@/actions/user";
import prisma from "@/config/db";

const Media = ({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: TPropertiesFormStep) => {
  const [tempFiles, setTempFiles] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [propertiesCount, setPropertiesCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await GetCurrentUserFromDB();
        const userSubscription = await prisma.subscription.findFirst({
          where: {
            userId: user?.data?.id,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        setSubscription(userSubscription);

        const count = await prisma.property.count({
          where: {
            userId: user?.data?.id,
          },
        });
        setPropertiesCount(count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onFinish = (value: any) => {
    setFinalValues({
      ...finalValues,
      media: {
        newlyUpdatedFiles: tempFiles,
        images: finalValues.media.images,
      },
    });
    setCurrentStep(currentStep + 1);
  };

  let showForm = true;
  let errorMessage = "";
  if (!subscription && tempFiles.length >= 5) {
    showForm = false;
    errorMessage =
      "You have reached the limit of 3 properties. Please purchase a subscription";
  }
  if (!subscription && tempFiles.length >= 10) {
    showForm = false;
    errorMessage =
      "You have reached the limit of 10 properties. Please purchase a subscription";
  }

  return (
    <Form
      onFinish={onFinish}
      initialValues={finalValues.media.images}
      className="bg-white shadow p-5 mt-6"
    >
      <div className="flex flex-wrap gap-5 mb-5 w-full">
        {finalValues?.media?.images.map((image: string, index: number) => (
          <div key={index}>
            <div className="flex flex-col border border-dashed border-gray-400 p-2 justify-center items-center space-y-2">
              <Image
                src={image}
                alt="properties-image"
                width={100}
                height={100}
                placeholder="blur"
                blurDataURL={image}
              />
              <span
                onClick={() => {
                  let tempMedia = finalValues.media;
                  tempMedia.images = tempMedia.images.filter(
                    (img: string) => img !== image
                  );
                  setFinalValues({
                    ...finalValues,
                    newlyUpdatedFiles: tempFiles,
                    media: tempMedia,
                  });
                }}
                className="text-red-600  text-sm cursor-pointer"
              >
                Delete <i className="ri-close-circle-line"></i>
              </span>
            </div>
          </div>
        ))}
      </div>
      {showForm ? (
        <Upload
          listType="picture-card"
          multiple
          beforeUpload={(file: any) => {
            setTempFiles([...tempFiles, file]);
            return false;
          }}
        >
          Upload
        </Upload>
      ) : (
        <div className="text-red-600 text-sm">{errorMessage}</div>
      )}
      <StepButton currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </Form>
  );
};

export default Media;
