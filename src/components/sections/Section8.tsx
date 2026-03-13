import React from "react";
import SectionTemplate from "../common/SectionTemplate";
import { section8 } from "../../schema/sections/section8";

interface Props {
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const Section8: React.FC<Props> = ({ formData, onChange }) => {
  return <SectionTemplate section={section8} formData={formData} onChange={onChange} />;
};

export default Section8;