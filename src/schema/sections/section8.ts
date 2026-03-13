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
      fields: [
        {
          name: "skipLogicNote",
          label: "Apply skip logic. If answer to mRDT was NO in D: LABORATORY TESTS OFFERED above, skip this section",
          type: "text",
          readOnly: true
        },
        {
          name: "malariaScreeningVsMrdt",
          label: "Malaria: Reporting on screening of patients (HMIS data) vs records of mRDT issues (LMIS data) for past three months",
          type: "table",
          columns: [
            { key: "month", label: "", type: "text", readOnly: true, width: "8%" }, 
            { key: "peopleTested", label: "Reported no. of people tested for malaria by mRDT (MOH 705A & MOH 705B/MOH 706)", type: "number" },
            { key: "mrdtConsumed", label: "No. of mRDT consumed dispensed (as reported in MOH 643/MOH 743)", type: "number" },
            { 
              key: "ratio", 
              label: "Reported number of patients screened for malaria/recorded number of issued mRDTs (%)", 
              type: "number",
              readOnly: true, // Make it read-only so users can't overwrite the math
              calculate: (row) => row.peopleTested && row.mrdtConsumed ? ((Number(row.peopleTested) / Number(row.mrdtConsumed)) * 100).toFixed(1) : "" // <-- AUTO-CALC
            },
            { key: "varianceReason", label: "In case of variance, what is the reason for the variance", type: "textarea" },
          ],
          defaultValue: defaultMonthRows,
        },
        {
          name: "malariaTreatmentTriangulation",
          label: "Malaria: Comparison reporting of “malaria positive cases” and “patients treated” (HMIS data) vs “AL treatments supplied” (LMIS data) for past three months",
          type: "table",
          columns: [
            { key: "month", label: "", type: "text", readOnly: true, width: "8%" },
            { key: "positiveCases", label: "Reported no. of positive mRDT + Microscopy tests (MOH 705A/MOH 705B/MOH 706)", type: "number" },
            { key: "patientsTreated", label: "Reported no. of patients treated (Ref. weight bands in MOH 743)", type: "number" },
            { key: "alIssued", label: "No. of AL treatment packs issued as per monthly summary tool MOH 743", type: "number" },
            { 
              key: "ratio", 
              label: "% AL treatments issued/No. of reported positive cases", 
              type: "number",
              readOnly: true,
              calculate: (row) => row.alIssued && row.positiveCases ? ((Number(row.alIssued) / Number(row.positiveCases)) * 100).toFixed(1) : ""
            },
            { key: "varianceReason", label: "In case of variance, what is the reason given for the variance", type: "textarea" },
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
          label: "HIV: Reporting on screening of patients (HMIS data) vs records of HIV RDT issues (LMIS data) for past three months",
          type: "table",
          columns: [
            { key: "month", label: "", type: "text", readOnly: true, width: "8%" },
            { key: "peopleScreened", label: "Reported no. of people screened for MOH 731", type: "number" },
            { key: "trinscreenUsed", label: "No. of screening tests (Trinscreen) consumed/as per lab register MOH 643", type: "number" },
            { 
              key: "ratio", 
              label: "Reported number of patients screened for HIV/recorded number of HIV RDTs (Trinscreen) issued (%)", 
              type: "number",
              readOnly: true,
              calculate: (row) => row.peopleScreened && row.trinscreenUsed ? ((Number(row.peopleScreened) / Number(row.trinscreenUsed)) * 100).toFixed(1) : ""
            },
            { key: "varianceReason", label: "In case of variance, what is the reason for the variance", type: "textarea" },
          ],
          defaultValue: defaultMonthRows,
        },
        {
          name: "hivTreatmentTriangulation",
          label: "HIV: Comparison reporting of “HIV positive cases” and “patients put on treatment” (HMIS data) vs “ARV treatments supplied” (LMIS data) for past three months",
          type: "table",
          columns: [
            { key: "month", label: "", type: "text", readOnly: true, width: "8%" },
            { key: "positiveTests", label: "Reported no. of positive HIV tests (MOH 731)", type: "number" },
            { key: "putOnTreatment", label: "Reported no. of patients put on treatment (MOH 731)", type: "number" },
            { key: "arvsIssued", label: "No. of ARV treatments issued as per dispensing area register (DAR in pharmacy MOH 367 A)", type: "number" },
            { 
              key: "ratio", 
              label: "% ARV treatments issued/No. of reported on treatment", 
              type: "number",
              readOnly: true,
              calculate: (row) => row.arvsIssued && row.putOnTreatment ? ((Number(row.arvsIssued) / Number(row.putOnTreatment)) * 100).toFixed(1) : ""
            },
            { key: "varianceReason", label: "In case of variance, what is the reason given for the variance", type: "textarea" },
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