import type { FormSection } from "../../types/form";
import { makeSectionSummary, yesNoOptions } from "../../utils/helpers";

export const section6: FormSection = {
  id: "section6",
  title: "6. Pharmacovigilance",
  groups: [
    {
      title: "Observations",
      fields: [
        {
          name: "pvFormsAvailable",
          label: "i. Are there pharmacovigilance reporting forms (Pharmacovigilance electronic reporting system) in the facility?",
          type: "radio",
          options: yesNoOptions,
        },
        {
          name: "pvEventsReported",
          label: "ii. Any pharmacovigilance events reported from facility to PPB? (check if any)",
          type: "radio",
          options: yesNoOptions,
        },
        {
          name: "suspectedPoorQualityProducts",
          label: "iii. In last 6 months, have you had suspected poor quality products?",
          type: "radio",
          options: yesNoOptions,
        },
        {
          name: "poorQualityProductsTable",
          label: "List poor quality products",
          isFixed: true, 
          type: "table",
          visibleWhen: [{ field: "suspectedPoorQualityProducts",
             equals: "yes" }],
          className: "indented-field",
          columns: [
            { key: "category", label: "Category", type: "text" },
            { key: "genericName", label: "Generic Name", type: "text" },
            { key: "poorQualityAspect", label: "Aspect of poor quality", type: "textarea" },
          ],
          minRows: 3,
        },
        {
          name: "reportsSubmittedToPpb",
          label: " Have reports for suspected poor quality products been submitted to PPB? (check evidence) ",
          type: "radio",
           visibleWhen: [{ field: "suspectedPoorQualityProducts",
             equals: "yes" }],
          options: yesNoOptions,
          className: "indented-field"
        },
        {
          name: "pvTrainingSessions",
          label: "iv. How many training events/sessions for pharmacovigilance in previous 1 year?",
          type: "number",
        },
        {
          name: "adverseEventsReported",
          label: "v. Has the facility reported any adverse events in the last 1 year?",
          type: "radio",
          options: yesNoOptions,
        },
        { 
          name: "adverseEventsCount", 
          label: "How many?",
          type: "number",
          className: "indented-field", 
          visibleWhen: [
            { 
              field: "adverseEventsReported", 
              equals: "yes" 
            }
          ],
        },  
        {
          name: "challengeSubmittingReports",
          label: "vi. If no report was submitted, was there a challenge in submitting to PPB?",
          type: "radio",
          options: yesNoOptions,
          visibleWhen: [
            {
              field: "pvEventsReported",
              equals: "no"
            }
          ]
        },
        {
          name: "mtcPvActivities",
          label: "vii. Within previous 3 months, has MTC carried out pharmacovigilance activities? (Request documentation to verify)",
          type: "radio",
          options: yesNoOptions,
        },
        makeSectionSummary("B. Pharmacovigilance"),
      ],
    },
  ],
};
