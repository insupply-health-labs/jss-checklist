import React, { useMemo } from "react";
import SectionTemplate from "../common/SectionTemplate";
import { section8 } from "../../schema/sections/section8";
import { getHivScreeningAvailability } from "../../utils/FormEngine";
import type { FormSection } from "../../types/form"; 

interface Props {
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const Section8: React.FC<Props> = ({ formData, onChange }) => {
  const hivScreeningAvailability = useMemo(
    () => getHivScreeningAvailability(formData),
    [formData]
  );

  const dynamicallyFilteredSection8 = useMemo(() => {
    if (hivScreeningAvailability !== "no") {
      return section8;
    }

    const modifiedGroups = section8.groups.map((group) => {
      if (group.title === "HIV Triangulation") {
        return {
          ...group,
          fields: [
            {
              name: "hivSkipMessage",
              label: "This section is skipped because 'HIV Screening test' was marked as 'No' in Section 1.",
              type: "text" as const, 
              readOnly: true,
            },
          ],
        };
      }
      return group;
    });

    return { ...section8, groups: modifiedGroups } as FormSection; 
  }, [hivScreeningAvailability]);

  return (
    <SectionTemplate 
      section={dynamicallyFilteredSection8} 
      formData={formData} 
      onChange={onChange} 
    />
  );
};

export default Section8;