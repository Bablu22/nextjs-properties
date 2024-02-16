import { Button } from "antd";
import React from "react";

interface Props {
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
  loading?: boolean;
  isLastItem?: boolean;
}

const StepButton = ({
  currentStep,
  setCurrentStep,
  loading,
  isLastItem,
}: Props) => {
  return (
    <div className="flex justify-end space-x-4 mt-5">
      <Button
        type="primary"
        disabled={currentStep === 0}
        onClick={() => setCurrentStep(currentStep - 1)}
      >
        Back
      </Button>
      <Button loading={loading} htmlType="submit" type="primary">
        {isLastItem ? "Submit" : "Next"}
      </Button>
    </div>
  );
};

export default StepButton;
