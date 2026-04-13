import React from "react";
import SectionTemplate from "../common/SectionTemplate";
import { section1 } from "../../schema/sections/section1";
import { mflFacilities } from "../../data/mflFacilities"; 
import "../../App.css";

interface Props {
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const Section1: React.FC<Props> = ({ formData, onChange }) => {
  
  const handleCustomChange = (name: string, value: any) => {
    onChange(name, value);

    if (name === "facilityName" && typeof value === "string") {
      const typedName = value.trim().toLowerCase();
      
      const matchedFacility = mflFacilities.find(
        (facility: any) => facility.name.toLowerCase() === typedName
      );

      if (matchedFacility) {
        onChange("facilityMflCode", matchedFacility.mflCode || "");
        onChange("facilityLevel", matchedFacility.facilityLevel || "");
        onChange("ownership", matchedFacility.ownership || "");
        onChange("county", matchedFacility.county || "");
        onChange("subCounty", matchedFacility.subCounty || "");
      } else if (formData.facilityMflCode) {
        // Clear fields if the name no longer matches
        onChange("facilityMflCode", "");
        onChange("facilityLevel", "");
        onChange("ownership", "");
        onChange("county", "");
        onChange("subCounty", "");
      }
    }
  };

  return (
    <SectionTemplate 
      section={section1} 
      formData={formData} 
      onChange={handleCustomChange} 
    />
  );
};

export default Section1;