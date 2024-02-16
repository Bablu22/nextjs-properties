import { Spin } from "antd";
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-white z-50">
      <Spin size="large" />
    </div>
  );
};

export default Loader;
