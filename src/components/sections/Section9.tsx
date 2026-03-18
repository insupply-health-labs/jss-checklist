import React, { useEffect } from "react";
import SectionTemplate from "../common/SectionTemplate";
import { section9 } from "../../schema/sections/section9";

interface Props {
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const Section9: React.FC<Props> = ({ formData, onChange }) => {

  useEffect(() => {
    // These keys now EXACTLY match the custom names from your sections
    const summaryMappings = [
      { key: "facilityGovernanceAndServicesConclusion", title: "Facility Governance & Services" },
      { key: "humanResourceCapacityBuildingConclusion", title: "Human Resource Capacity Building" },
      { key: "availabilityAndUseOfGuidelinesAndSopsConclusion", title: "Availability & Use of Guidelines and SOPs" },
      { key: "availabilityAndUseOfRecordsAndReportingFormsConclusion", title: "Availability and Use of Records & Reporting Forms" },
      { key: "storageConditionsConclusion", title: "Storage Conditions" },
      // Note: Because Pharmacovigilance didn't have a 2nd string in your snippet, it defaults to "sectionSummary"
      { key: "sectionSummary", title: "Pharmacovigilance" }, 
      { key: "stockMovementConclusion", title: "Stock Movement Management & Record Keeping" },
      { key: "patientCommodityTriangulationConclusion", title: "Patient and Commodity Data Triangulation" }
    ];

    let aggregatedData: any[] = [];

    summaryMappings.forEach(({ key, title }) => {
      const sectionData = formData[key];
      
      if (sectionData && Array.isArray(sectionData)) {
        const filledRows = sectionData
          .filter((row) => row.bestPractice || row.mainIssues || row.underlyingCauses)
          .map((row) => ({
            // Force the mapping to EXACTLY match Section 9's column keys
            thematicArea: title,
            bestPractice: row.bestPractice || "",
            mainIssues: row.mainIssues || "", 
            underlyingCauses: row.underlyingCauses || ""
          }));
          
        aggregatedData = [...aggregatedData, ...filledRows];
      }
    });

    // We check the current data in the table to see if it matches our newly aggregated data
    // This deep comparison PREVENTS infinite re-renders and allows you to edit Table 2!
    const currentTableData = formData.overviewTable1 || [];
    
    if (JSON.stringify(currentTableData) !== JSON.stringify(aggregatedData)) {
      onChange("overviewTable1", aggregatedData);
    }
    
  }, [formData, onChange]); // Re-run when formData changes to keep columns synced

  return <SectionTemplate section={section9} formData={formData} onChange={onChange} />;
};

export default Section9;