import React, { useEffect } from "react";
import SectionTemplate from "../common/SectionTemplate";
import { section9, summaryMappings } from "../../schema/sections/section9"; 

interface Props {
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const Section9: React.FC<Props> = ({ formData, onChange }) => {

  useEffect(() => {
    summaryMappings.forEach(({ key }) => {
      const sourceData = formData[key];
      const targetTable1Key = `overview_${key}`; 
      const targetTable2Key = `actionPlan_${key}`; 

      if (sourceData && Array.isArray(sourceData)) {
        const filledRows1 = sourceData
          .filter((row) => row.bestPractice || row.mainIssues || row.underlyingCauses)
          .map((row) => ({
            bestPractice: row.bestPractice || "",
            mainIssues: row.mainIssues || "", 
            underlyingCauses: row.underlyingCauses || ""
          }));

        const currentTableData1 = formData[targetTable1Key] || [];
        if (JSON.stringify(currentTableData1) !== JSON.stringify(filledRows1)) {
          onChange(targetTable1Key, filledRows1);
        }
        const actionPlanRows = sourceData
          .filter((row) => row.mainIssues) 
          .map((row, index) => {
            const existingRow = (formData[targetTable2Key] || [])[index] || {};

            return {
              issueGap: row.mainIssues, 
              desiredResult: existingRow.desiredResult || "",
              actionRequired: existingRow.actionRequired || "",
              responsiblePerson: existingRow.responsiblePerson || "",
              resourcesNeeded: existingRow.resourcesNeeded || "",
              completionDate: existingRow.completionDate || "",
            };
          });

        const currentTableData2 = formData[targetTable2Key] || [];
        if (JSON.stringify(currentTableData2) !== JSON.stringify(actionPlanRows)) {
          onChange(targetTable2Key, actionPlanRows);
        }
      }
    });
    
  }, [formData, onChange]); 

  return <SectionTemplate section={section9} formData={formData} onChange={onChange} />;
};

export default Section9;