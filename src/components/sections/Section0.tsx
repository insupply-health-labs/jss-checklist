import React from "react";
import SectionTemplate from "../common/SectionTemplate";
import { section0 } from "../../schema/sections/section0";
import { mflFacilities } from "../../data/mflFacilities";
import "../../App.css";

interface Props {
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const Section0: React.FC<Props> = ({ formData, onChange }) => {
  
  const handleCustomChange = (name: string, value: any) => {
    onChange(name, value);

    if (name === "facilityName" && typeof value === "string") {
      const typedName = value.trim().toLowerCase();

      // Find the facility
      const matchedFacility = mflFacilities.find(
        (facility: any) => 
          (facility.name && facility.name.toLowerCase() === typedName) || 
          (facility.facilityName && facility.facilityName.toLowerCase() === typedName)
      );

      if (matchedFacility) {
       
        const facilityData = matchedFacility as any;

        // Auto-populate the read-only fields
        onChange("facilityMflCode", facilityData.mflCode || facilityData.facilityMflCode || "");
        onChange("facilityLevel", facilityData.facilityLevel || "");
        onChange("ownership", facilityData.ownership || "");
        onChange("county", facilityData.county || "");
        onChange("subCounty", facilityData.subCounty || "");
      } else if (formData.facilityMflCode) {
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
      section={section0}
      formData={formData}
      onChange={handleCustomChange}
    />
  );
};

export default Section0;