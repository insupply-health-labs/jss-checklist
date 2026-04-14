import type { FormSection } from "../../types/form";
import { makeSectionSummary, yesNoOptions } from "../../utils/helpers";

export const section4: FormSection = {
  id: "section4",
  title: "4. Availability and Use of Commodity Data Collection and Reporting Tools",
  groups: [
    {
      title: "A. Key Recording and Reporting Tools",
      fields: [
        {
          name: "recordingReportingTools",
          type: "table",
          isFixed: true, 
          label: "Recording and Reporting Tools",
          columns: [
            { key: "tool", label: "TOOL", type: "text", readOnly: true },
            { key: "availability", label: "AVAILABILITY FOR USE YES/NO (*)", type: "select", options: yesNoOptions },
            { key: "completeness", label: "COMPLETENESS OF CURRENT/ LAST EXEMPLAR YES/NO", type: "select", options: yesNoOptions },
            { key: "remarks", label: "REMARKS", type: "textarea" },
          ],
          defaultValue: [
            { tool: "General", isHeader: true },
            { tool: "Bin cards/Stock cards" },
            { tool: "S-11 (Issue & requisition voucher)" },
            { tool: "FO58 (Disposal form)" },
            { tool: "PV forms – Substandard/poor quality medicinal product (Pink form)" },
            { tool: "PV forms – ADR forms (Yellow form)" },
            
            { tool: "Out-Patient department (OPD)", isHeader: true },
            { tool: "MOH 717 – General OP attendance (service workload)" },
            { tool: "MOH 705A – OP summary <5 yrs" },
            { tool: "MOH 705B – OP summary >5 yrs" },
            { tool: "MOH 743 – Malaria commodities reporting form" },
            
            { tool: "In-Patient (IP)", isHeader: true },
            { tool: "Daily DAR" },
            
            { tool: "MCH/FP", isHeader: true },
            { tool: "F-CDRR – Facility Contraceptives Data Report and Request" },
            { tool: "MOH 512 – FP DAR" },
            { tool: "MOH 710 – Vaccines and immunization" },
            { tool: "MOH 711 – Integrated RMNCH, rehabilitation" },
            { tool: "F-CDRR (TB)" },
            
            { tool: "Comprehensive Care Centre (CCC)", isHeader: true },
            { tool: "MOH 734 – FCDRR Nutrition commodities" },
            { tool: "MOH 733 – Nutrition services summary" },
            { tool: "MOH 729B Ver 2023 – F-MAPS" },
            { tool: "MOH 730B Ver 2023 – FCDRR ART commodities" },
            { tool: "MOH 367A - DAR" },
            { tool: "MOH 731" },
            
            { tool: "TB-Routine", isHeader: true },
            { tool: "MOH 731-3 – HIV and TB treatment" },
            { tool: "MOH 711 – TB Screening" },
            { tool: "TB-DADR" },
            { tool: "TB-FCDRR" },
            
            { tool: "Laboratory", isHeader: true },
            { tool: "Daily Activity Register" },
            { tool: "MOH 643 – F-CDRR (ver. 2019)" },
            { tool: "MOH 643B – F-CDRR ART lab monitoring" },
            { tool: "MOH 643C – F-CDRR EID and VL" },
            { tool: "MOH 706 – Lab summary report" },
            { tool: "Bin cards/ Stock cards" },
          ],
        },
        makeSectionSummary(
          "B. Availability and Use of Records & Reporting Forms",
          "availabilityAndUseOfRecordsAndReportingFormsConclusion"
        ),
      ],
    },
  ],
};