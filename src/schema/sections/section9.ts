import type { FormSection } from "../../types/form";

export const summaryMappings = [
  { key: "facilityGovernanceAndServicesConclusion", title: "Facility Governance & Services" },
  { key: "humanResourceCapacityBuildingConclusion", title: "Human Resource Capacity Building" },
  { key: "availabilityAndUseOfGuidelinesAndSopsConclusion", title: "Availability & Use of Guidelines and SOPs" },
  { key: "availabilityAndUseOfRecordsAndReportingFormsConclusion", title: "Availability and Use of Records & Reporting Forms" },
  { key: "storageConditionsConclusion", title: "Storage Conditions" },
  { key: "sectionSummary", title: "Pharmacovigilance" },
  { key: "stockMovementConclusion", title: "Stock Movement Management & Record Keeping" },
  { key: "patientCommodityTriangulationConclusion", title: "Patient and Commodity Data Triangulation" }
];

// 1. Generate the 8 Overview Tables
const generatedOverviewTables = summaryMappings.map((mapping) => ({
  name: `overview_${mapping.key}`, 
  label: mapping.title,            
  type: "table" as const,
  columns: [
    { key: "bestPractice", label: "BEST PRACTICES", type: "textarea" as const, readOnly: true },
    { key: "mainIssues", label: "MAIN ISSUES/GAPS IDENTIFIED", type: "textarea" as const, readOnly: true },
    { key: "underlyingCauses", label: "UNDERLYING CAUSES", type: "textarea" as const, readOnly: true },
  ],
  defaultValue: [{ bestPractice: "", mainIssues: "", underlyingCauses: "" }],
}));

// 2. Generate the 8 Action Plan Tables
const generatedActionPlanTables = summaryMappings.map((mapping) => ({
  name: `actionPlan_${mapping.key}`, 
  label: mapping.title,            
  type: "table" as const,
  columns: [
    // Read-only: Automatically pulled from the gaps identified earlier
    { key: "issueGap", label: "ISSUE/GAP IDENTIFIED", type: "textarea" as const, readOnly: true }, 
    
    // Editable: Action plan fields
    { key: "desiredResult", label: "DESIRED RESULT", type: "textarea" as const },
    { key: "actionRequired", label: "ACTION REQUIRED", type: "textarea" as const },
    { key: "responsiblePerson", label: "RESPONSIBLE PERSON", type: "text" as const },
    { key: "resourcesNeeded", label: "RESOURCES NEEDED", type: "textarea" as const },
    { key: "completionDate", label: "COMPLETION DATE", type: "date" as const },
  ],
  defaultValue: [{ issueGap: "", desiredResult: "", actionRequired: "", responsiblePerson: "", resourcesNeeded: "", completionDate: "" }],
}));

export const section9: FormSection = {
  id: "section9",
  title: "9. End-of-Visit Summary Overview",
  groups: [
    {
      title: "Overview Table 1: Best Practices / Gaps + Root Cause Analysis",
      description: "Auto-populated from previous sections",
      fields: [
        ...generatedOverviewTables
      ],
    },
    {
      title: "Overview Table 2: Action Plan",
      description: "Action Plan (Fill this out based on the gaps auto-populated above)",
      fields: [
        ...generatedActionPlanTables
      ],
    },
  ],
};