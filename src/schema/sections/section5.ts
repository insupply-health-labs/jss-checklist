import type { FormSection } from "../../types/form";
import { makeSectionSummary, yesNoOptions } from "../../utils/helpers";

export const section5: FormSection = {
  id: "section5",
  title: "5. Storage Conditions",
  groups: [
    {
      title: "A. OBSERVATIONS",
      fields: [
        { 
          name: "numberOfStores", 
          label: "i. How many HPT stores does the facility have? (State number)", 
          type: "number" 
        },
        {
          name: "storeTypes",
          label: "ii. If more than one select multiple:",
          type: "multiselect",
          options: [
            { label: "Pharmaceuticals", value: "pharmaceuticals" },
            { label: "Medical supplies", value: "medical_supplies" },
            { label: "Laboratory", value: "laboratory" },
            { label: "Nutrition", value: "nutrition" },
          ],
        },
        // Individual questions for Observation (ii)
        { name: "storeClean", 
          label: " a. Is the store clean and tidy?", 
          type: "radio", 
          options: yesNoOptions,
          className: "indented-field"
         },
        { name: "adequateLighting",
          label: " b. Is there adequate lighting?", 
          type: "radio", 
          options: yesNoOptions,
          className: "indented-field"
         },
        { name: "directSunlight", 
          label: " c. Are the HPT exposed to direct sunlight?", 
          type: "radio", 
          options: yesNoOptions,
          className: "indented-field"
         },
        { name: "moistureLeakage", 
          label: " d. Presence of moisture/water leakages", 
          type: "radio", 
          options: yesNoOptions,
          className: "indented-field"
         },
        { name: "verminEvidence", 
          label: " e. Check for (evidence of) vermin/pests/insects", 
          type: "radio", 
          options: yesNoOptions,
          className: "indented-field"
         },
        { name: "adequateShelving", 
          label: " f. Is there adequate shelving and pallets?", 
          type: "radio", 
          options: yesNoOptions,
          className: "indented-field"
         },
        { name: "neatArrangement", 
          label: " g. Are HPT stored and neatly arranged on shelves/pallets?", 
          type: "radio", 
          options: yesNoOptions,
          className: "indented-field"
         },
        { name: "storeThermometer", 
          label: " h. Does the store have a thermometer for temperature monitoring?", 
          type: "radio", 
          options: yesNoOptions,
        className: "indented-field" },
        { name: "storeSecurity", 
          label: " i. Is there adequate security (burglar-proofing)?", 
          type: "radio", 
          options: yesNoOptions,
          className: "indented-field"
         },
        { name: "designatedAccess", 
          label: " j. Is there a designated person allowed to access the store?", 
          type: "radio", 
          options: yesNoOptions,
          className: "indented-field"
         },
        { 
          name: "designatedPersonName", 
          label: "If yes, who?", 
          type: "text",
          visibleWhen: [{ field: "designatedAccess", equals: "yes" }]
        },
        { name: "hazardousMaterials", 
          label: " k. Presence of hazardous materials in the store", 
          type: "radio", 
          options: yesNoOptions,
        className: "indented-field" },
        { name: "functionalExtinguisher", 
          label: "l. Is there a functional extinguisher/sand bucket?", 
          type: "radio", 
          options: yesNoOptions,
          className: "indented-field"
         },

        // Questions iii to viii
        { name: "tempChartFilled", label: "iii. Is the store temperature chart filled out until the previous working day?", type: "radio", options: yesNoOptions },
        { name: "fridgeThermometer", label: "iv. Is there a functional thermometer for temperature monitoring of medicines fridge?", type: "radio", options: yesNoOptions },
        { name: "fridgeTempChart", label: "v. Is the fridge temperature chart filled out until the previous working day?", type: "radio", options: yesNoOptions },
        { 
          name: "fefoCompliance", 
          label: "vi. Are health products arranged with arrows pointing up; identification labels, expiry dates, and manufacturing dates clearly visible; and in accordance to FEFO?", 
          type: "radio", 
          options: yesNoOptions 
        },
        { name: "expiredSeparate", label: "vii. Are there expired and/or unusable items are kept separate from other stock?", type: "radio", options: yesNoOptions },
        { 
          name: "expiredStoredSeparately", 
          label: "Are expired/unusable HPT stored separately from other items?", 
          type: "radio", 
          options: yesNoOptions,
          className: "indented-field",
          visibleWhen: [{ field: "expiredSeparate", equals: "yes" }]
        },
        { 
          name: "f058Recording", 
          label: "viii. Are expired HPT in the store recorded in the FO58 register (or other suitable register with all the data required - name of item, qty expired, value, reason for expiry etc.)", 
          type: "radio", 
          options: yesNoOptions 
        },

        makeSectionSummary(
          "B. Storage Conditions",
          "storageConditionsConclusion"
        ),
      ],
    },
  ],
};