"use client";

import { Steps } from "antd";
import { useState } from "react";
import Location from "./Location";
import Basic from "./Basic";
import Amenities from "./Amenities";
import Media from "./Media";
import Contact from "./Contact";

export interface TPropertiesFormStep {
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
  finalValues: any;
  setFinalValues: (finalValue: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isEditable?: boolean;
}

interface Props {
  initialValues?: any;
  isEditable?: boolean;
}

const PropertiesForm = ({ initialValues, isEditable }: Props) => {
  const [finalValues, setFinalValues] = useState({
    basic: initialValues,
    location: initialValues,
    amenities: initialValues,
    media: {
      newlyUpdatedFiles: [],
      images: initialValues?.images || [],
    },
    contact: initialValues,
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const commonProps = {
    currentStep,
    setCurrentStep,
    finalValues,
    setFinalValues,
    loading,
    setLoading,
    isEditable,
  };

  const steps = [
    {
      title: "Basic",
      content: <Basic {...commonProps} />,
    },
    {
      title: "Location",
      content: <Location {...commonProps} />,
    },
    {
      title: "Amenities",
      content: <Amenities {...commonProps} />,
    },
    {
      title: "Media",
      content: <Media {...commonProps} />,
    },
    {
      title: "Contact",
      content: <Contact {...commonProps} />,
    },
  ];

  return (
    <div>
      <Steps size="small" current={currentStep} items={steps} />
      <div>{steps[currentStep].content}</div>
    </div>
  );
};

export default PropertiesForm;
