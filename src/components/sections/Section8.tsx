import React, { useMemo } from "react";
import SectionTemplate from "../common/SectionTemplate";
import { section8 } from "../../schema/sections/section8";
import { getHivScreeningAvailability, getMalariaRdtAvailability } from "../../utils/FormEngine";
import type { FormSection } from "../../types/form";

interface Props {
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const Section8: React.FC<Props> = ({ formData, onChange }) => {
  // 1. Check statuses from Section 1
  const hasLab = formData.hasLaboratory; // "yes" or "no"
  const malariaAvailability = useMemo(() => getMalariaRdtAvailability(formData), [formData]);
  const hivAvailability = useMemo(() => getHivScreeningAvailability(formData), [formData]);

  // 2. Dynamically modify the schema based on individual test availability
  const dynamicallyFilteredSection8 = useMemo(() => {
    const modifiedGroups = section8.groups.map((group) => {
      
      // --- MALARIA LOGIC ---
      if (group.title === "Malaria Triangulation") {
        if (hasLab === "no" || malariaAvailability === "no") {
          return {
            ...group,
            fields: [
              {
                name: "malariaSkipMessage",
                label: "The Malaria tables are skipped because the facility has no laboratory or 'Malaria RDT' was marked as 'No'.",
                type: "text" as const,
                readOnly: true,
              },
            ],
          };
        }
      }

      // --- HIV LOGIC ---
      if (group.title === "HIV Triangulation") {
        if (hasLab === "no" || hivAvailability === "no") {
          return {
            ...group,
            fields: [
              {
                name: "hivSkipMessage",
                label: "The HIV tables are skipped because the facility has no laboratory or 'HIV Screening test' was marked as 'No'.",
                type: "text" as const,
                readOnly: true,
              },
            ],
          };
        }
      }

      // If the group doesn't need to be skipped, return it normally
      return group;
    });

    return { ...section8, groups: modifiedGroups } as FormSection;
  }, [hasLab, malariaAvailability, hivAvailability]);

  return (
    <SectionTemplate 
      section={dynamicallyFilteredSection8} 
      formData={formData} 
      onChange={onChange} 
    />
  );
};

export default Section8;