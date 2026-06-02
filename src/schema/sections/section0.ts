import type { FormSection } from "../../types/form";
import { mflFacilities } from "../../data/mflFacilities"; 

// Shared position options for the respondent dropdown
const positionOptions = [
  "Facility in charge",
  "Pharmacist in charge",
  "Pharmaceutical technologist in charge",
  "Nursing in charge",
  "Laboratory in charge",
  "Nutritionist in charge",
  "Public health officer in charge",
  "Other",
].map((item) => ({ label: item, value: item.toLowerCase().replace(/\s+/g, "_") }));

export const section0: FormSection = {
  id: "section0",
  title: "Facility General Information", 
  groups: [
    {
      title: "A. General",
      className: "general-info-grid", 
      fields: [
        // ROW 1
        { 
          name: "facilityName",
          label: "Facility Name",
          type: "search-select", 
          helperText: "Select a facility",
          options: Array.from(new Set(mflFacilities.map((f: any) => f.facilityName)))
            .filter(Boolean) 
            .sort((a, b) => a.localeCompare(b))
            .map((uniqueName: string) => ({
              label: uniqueName,
              value: uniqueName
            }))
        },
        { 
          name: "county", 
          label: "County",
          type: "text",
          readOnly: true 
        },
        { 
          name: "subCounty", 
          label: "Sub-county:",
          type: "text", 
          readOnly: true 
        },

        // ROW 2 
        { 
          name: "facilityLevel",
          label: "Facility Level",
          type: "text", 
          readOnly: true 
        },
        {
          name: "ownership",
          label: "Ownership (MoH, FBO, Private, Others)",
          type: "text", 
          readOnly: true,
        },
        { 
          name: "facilityMflCode",
          label: "Facility MFL Code", 
          type: "text", 
          readOnly: true 
        },

        // ROW 3
        { 
          name: "dateOfVisit",
          label: "Date of Visit:",
          type: "date",
          dateFormat: "dd/MM/yyyy",
          placeholderText: "dd/mm/yyyy"
        },
        { 
          name: "supervisionTeamNo",
          label: "Supervision Team Number",
          type: "text" 
        },
        { 
          name: "teamLeader",
          label: "Name of Supervision Team Leader:",
          type: "text" 
        },

        // ROW 4
        { 
          name: "respondentName", 
          label: "Name of Respondent", 
          type: "text" 
        },
        {
          name: "respondentPosition",
          label: "Position/Designation of Respondent",
          type: "select",
          options: positionOptions,
        },
        { 
          name: "respondentPhone", 
          label: "Tel. Contact of Respondent",
          type: "text" 
        },

        // HIDDEN FIELD (Appears only if "Other" is selected) ---
        {
          name: "respondentPositionOther",
          label: "Please specify other position",
          type: "text",
          placeholder: "Enter designation...",
          visibleWhen: [{ 
            field: "respondentPosition", 
            equals: "other" 
          }],
        },
      ],
    }
  ]
};