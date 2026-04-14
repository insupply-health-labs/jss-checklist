import type { FormSection } from "../../types/form";
import { makeSectionSummary } from "../../utils/helpers";

const defaultMonthRows = [
  { month: "Month 1" },
  { month: "Month 2" },
  { month: "Month 3" }
];

export const section8: FormSection = {
  id: "section8",
  title: "8. PATIENT AND COMMODITY DATA TRIANGULATION",
  groups: [
    {
      title: "Malaria Triangulation",
      description: "Notes: MOH 705A/B for primary care, MOH 706 for hospitals. MOH 743 for commodity data.",
      fields: [
        {
          name: "malariaScreeningVsMrdt",
          label: "Malaria: Reporting on screening vs records of mRDT issues",
          type: "table",
          visibleWhen: [
            { field: "hasLaboratory", equals: "yes" },
            { 
              field: "laboratoryTests", 
              includes: { test: "Malaria RDT", isYes: true } 
            }
          ],
          columns: [
            { key: "month", label: "Month", type: "text", readOnly: true, width: "10%" }, 
            { key: "peopleTested", label: "Reported tested (MOH 705A/B/706)", type: "number", min: 0 }, // min added
            { key: "mrdtConsumed", label: "mRDT consumed (MOH 643/743)", type: "number", min: 0 }, // min added
            { 
              key: "ratio", 
              label: "Ratio (%)", 
              type: "number",
              readOnly: true, 
              calculate: (row) => row.peopleTested && row.mrdtConsumed ? ((Number(row.peopleTested) / Number(row.mrdtConsumed)) * 100).toFixed(1) : "" 
            },
            { key: "varianceReason", label: "Variance Reason", type: "textarea" },
          ],
          defaultValue: defaultMonthRows,
        },
        {
          name: "malariaTreatmentTriangulation",
          label: "Malaria: Positive cases vs AL treatments supplied",
          type: "table",
          visibleWhen: [
            { field: "hasLaboratory", equals: "yes" },
            { 
              field: "laboratoryTests", 
              includes: { test: "Malaria RDT", isYes: true } 
            }
          ],
          columns: [
            { key: "month", label: "Month", type: "text", readOnly: true, width: "10%" },
            { key: "positiveCases", label: "Positive mRDT + Micro (MOH 705A/B/706)", type: "number", min: 0 }, // min added
            { key: "patientsTreated", label: "Patients treated (MOH 743)", type: "number", min: 0 }, // min added
            { key: "alIssued", label: "AL packs issued (MOH 743)", type: "number", min: 0 }, // min added
            { 
              key: "ratio", 
              label: "% AL/Positive cases", 
              type: "number",
              readOnly: true,
              calculate: (row) => row.alIssued && row.positiveCases ? ((Number(row.alIssued) / Number(row.positiveCases)) * 100).toFixed(1) : ""
            },
            { key: "varianceReason", label: "Variance Reason", type: "textarea" },
          ],
          defaultValue: defaultMonthRows,
        },
      ],
    },
    {
      title: "HIV Triangulation",
      fields: [
        {
          name: "hivScreeningVsRdt",
          label: "HIV: Reporting on screening vs HIV RDT issues",
          type: "table",
          visibleWhen: [
            { field: "hasLaboratory", equals: "yes" },
            { 
              field: "laboratoryTests", 
              includes: { test: "HIV Screening test", isYes: true } 
            }
          ],
          columns: [
            { key: "month", label: "Month", type: "text", readOnly: true, width: "10%" },
            { key: "peopleScreened", label: "Screened (MOH 731)", type: "number", min: 0 }, // min added
            { key: "trinscreenUsed", label: "Trinscreen consumed (MOH 643)", type: "number", min: 0 }, // min added
            { 
              key: "ratio", 
              label: "Ratio (%)", 
              type: "number",
              readOnly: true,
              calculate: (row) => row.peopleScreened && row.trinscreenUsed ? ((Number(row.peopleScreened) / Number(row.trinscreenUsed)) * 100).toFixed(1) : ""
            },
            { key: "varianceReason", label: "Variance Reason", type: "textarea" },
          ],
          defaultValue: defaultMonthRows,
        },
        {
          name: "hivTreatmentTriangulation",
          label: "HIV: Positive cases vs ARV treatments supplied",
          type: "table",
          visibleWhen: [
            { field: "hasLaboratory", equals: "yes" },
            { 
              field: "laboratoryTests", 
              includes: { test: "HIV Screening test", isYes: true } 
            }
          ],
          columns: [
            { key: "month", label: "Month", type: "text", readOnly: true, width: "10%" },
            { key: "positiveTests", label: "Positive HIV tests (MOH 731)", type: "number", min: 0 }, // min added
            { key: "putOnTreatment", label: "Put on treatment (MOH 731)", type: "number", min: 0 }, // min added
            { key: "arvsIssued", label: "ARVs issued (MOH 367 A)", type: "number", min: 0 }, // min added
            { 
              key: "ratio", 
              label: "% ARV/On treatment", 
              type: "number",
              readOnly: true,
              calculate: (row) => row.arvsIssued && row.putOnTreatment ? ((Number(row.arvsIssued) / Number(row.putOnTreatment)) * 100).toFixed(1) : ""
            },
            { key: "varianceReason", label: "Variance Reason", type: "textarea" },
          ],
          defaultValue: defaultMonthRows,
        },
      ],
    },
    {
      title: "IN CONCLUSION (*)",
      fields: [
        makeSectionSummary(
          "Patient and Commodity Data Triangulation",
          "patientCommodityTriangulationConclusion"
        ),
      ],
    },
  ],
};