import type { FormSection, TableColumn } from "../../types/form";
import { makeSectionSummary, yesNoOptions } from "../../utils/helpers";

const guidelineColumns: TableColumn[] = [
  { key: "guideline", label: "Guideline (*)", type: "text", readOnly: true },
  { key: "year", label: "Year of Publication (where applicable)", type: "text" },
  { key: "available", label: "Available YES/NO (**)", type: "select", options: yesNoOptions },
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
          type: "table",
          columns: guidelineColumns,
          defaultValue: [
            { guideline: "Guidelines on Management of HPT in Kenya", year: "", available: "" },
            { guideline: "Quantification handbook on HPT", year: "", available: "" },
            { guideline: "Essential HPT Lists (Medicines, Medical Supplies, Diagnostics)", year: "", available: "" },
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
          type: "table",
          columns: [
            { key: "guideline", label: "Algorithm", type: "text", readOnly: true },
            { key: "available", label: "Available Yes/No", type: "select", options: yesNoOptions },
            { key: "year", label: "If yes, specify which year?", type: "text" },
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
          label: "",
          type: "table",
          columns: [
            { key: "guideline", label: "SOP", type: "text", readOnly: true },
            { key: "available", label: "Available Yes/No", type: "select", options: yesNoOptions },
            { key: "year", label: "If yes, specify which year?", type: "text" },
          ],
          defaultValue: [
            { guideline: "Storage", available: "", year: "" },
            { guideline: "Receiving", available: "", year: "" },
            { guideline: "Issuing", available: "", year: "" },
            { guideline: "Waste management", available: "", year: "" },
          ],
        },
      ],
    },
    {
      title: "Job Aids",
      fields: [
        {
          name: "jobAidsTable",
          label: "",
          type: "table",
          columns: [
            { key: "guideline", label: "Job Aid", type: "text", readOnly: true },
            { key: "available", label: "Available Yes/No", type: "select", options: yesNoOptions },
            { key: "year", label: "If yes, specify which year?", type: "text" },
          ],
          defaultValue: [
            { guideline: "Malaria", available: "", year: "" },
            { guideline: "FP", available: "", year: "" },
            { guideline: "HIV", available: "", year: "" },
            { guideline: "TB", available: "", year: "" },
          ],
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