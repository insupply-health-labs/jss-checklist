import type { FormSection, TableColumn } from "../../types/form";
import { makeSectionSummary, yesNoOptions } from "../../utils/helpers";

// Dynamically grab the current year (e.g., 2024) so it auto-updates next year!
const currentYear = new Date().getFullYear();

const guidelineColumns: TableColumn[] = [
  { key: "guideline", label: "Guideline (*)", type: "text", readOnly: true },
  { key: "available", label: "Available YES/NO (**)", type: "select", options: yesNoOptions },
  // Changed to type "number" and applied the currentYear as the maximum allowed value
  { key: "year", label: "Year of Publication", type: "number", max: currentYear }, 
];

export const section3: FormSection = {
  id: "section3",
  title: "3. Availability of Guidelines, Algorithms, Job Aids and SOPs",
  groups: [
    {
      title: "Treatment Guidelines (current editions)",
      fields: [
        {
          name: "treatmentGuidelinesTable",
          label: "",
          isFixed: true, 
          type: "table",
          columns: guidelineColumns,
          defaultValue: [
            { guideline: "Guidelines for the diagnosis, treatment and prevention of malaria in Kenya 6th edition", year: "", available: "" },
            { guideline: "National family planning guidelines for service providers", year: "", available: "" },
            { guideline: "Kenya HIV prevention and treatment guidelines", year: "", available: "" },
            { guideline: "TB Infection Prevention and Control for Health Care Workers", year: "", available: "" },
            { guideline: "Integrated Guideline for TB, Leprosy & Lung disease", year: "", available: "" },
          ],
        },
      ],
    },
    {
      title: "Commodity Management Guidelines",
      fields: [
        {
          name: "commodityManagementGuidelinesTable",
          label: "",
          isFixed: true, 
          type: "table",
          columns: guidelineColumns,
          defaultValue: [
            { guideline: "Guidelines on Management of HPT in Kenya", year: "", available: "" },
            { guideline: "Quantification handbook on HPT", year: "", available: "" },
            { guideline: "Kenya Essential Medicines List", year: "", available: "" },
            { guideline: "Kenya Essential Medical Supplies List", year: "", available: "" },
            { guideline: "Kenya Essential Diagnostics List and its specifications", year: "", available: "" },
          ],
        },
      ],
    },
    {
      title: "Diagnostic Algorithms",
      fields: [
        {
          name: "diagnosticAlgorithmsTable",
          label: "",
          isFixed: true, 
          type: "table",
          columns: [
            { key: "guideline", label: "Algorithm", type: "text", readOnly: true },
            { key: "available", label: "Available Yes/No", type: "select", options: yesNoOptions },
            { key: "year", label: "If yes, specify which year?", type: "number", max: currentYear },
          ],
          defaultValue: [
            { guideline: "HIV", available: "", year: "" },
            { guideline: "TB", available: "", year: "" },
            { guideline: "Malaria", available: "", year: "" },
          ],
        },
      ],
    },
    {
      title: "Commodity Management SOPs",
      fields: [
        {
          name: "commoditySopsTable",
          label: "List available SOPs (Add rows for others found in facility)",
          type: "table",
          columns: [
            { key: "guideline", label: "SOP Name", type: "text" },
            { key: "available", label: "Available Yes/No", type: "select", options: yesNoOptions },
          ],
          defaultValue: [
            { guideline: "Storage", available: "" },
            { guideline: "Receiving", available: "" },
            { guideline: "Issuing", available: "" },
            { guideline: "Waste management", available: "" },
          ],
          minRows: 4, 
        },
      ],
    },
    {
      title: "Job Aids",
      fields: [
        {
          name: "jobAidsTable",
          label: "List available Job Aids (Add rows for others found in facility)",
          type: "table",
          columns: [
            { key: "guideline", label: "Job Aid Name", type: "text" },
            { key: "available", label: "Available Yes/No", type: "select", options: yesNoOptions },
          ],
          defaultValue: [
            { guideline: "Malaria", available: "" },
            { guideline: "FP", available: "" },
            { guideline: "HIV", available: "" },
            { guideline: "TB", available: "" },
          ],
          minRows: 4,
        },
      ],
    },
    {
      title: "B. IN CONCLUSION (*)",
      fields: [
        makeSectionSummary(
          "Availability & Use of Guidelines and SOPs",
          "availabilityAndUseOfGuidelinesAndSopsConclusion"
        ),
      ],
    },
  ],
};