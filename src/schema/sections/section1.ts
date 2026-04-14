import type { FormSection } from "../../types/form";
import {
  availableOptions,
  makeSectionSummary,
  yesNoOptions,
} from "../../utils/helpers";
import { mflFacilities } from "../../data/mflFacilities"; 

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

export const section1: FormSection = {
  id: "section1",
  title: "1. Facility Governance and Services",
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
          options: mflFacilities
          .slice()
          .sort((a, b) => a.facilityName.localeCompare(b.facilityName))
          .map((facility: any) => ({
            label: facility.facilityName,
            value: facility.facilityName
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
          type: "date" 
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

        // -ROW 4 
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
          name: "respondentPositionOther",
          label: "Please specify other position",
          type: "text",
          placeholder: "Enter designation...",
          visibleWhen: [{ 
            field: "respondentPosition", 
            equals: "other" 
          }],
        },
        { 
          name: "respondentPhone", 
          label: "Tel. Contact of Respondent",
          type: "text" 
        },
      ],
    },
    {
      title: "B. Facility Management/Governance",
      description: "The names/positions of core members of the different teams can be completed by the county pharmacist/HPM mentor, as applicable, prior to visit, to save time for checking/reviewing minutes of the last meetings",
      fields: [
        {
          name: "facilityManagementTeam",
          label: "i. Facility Management Team",
          type: "select",
          options: availableOptions,
        },
        {
          name: "facilityManagementMembers",
          label: "Facility Management Team Members",
          type: "table",
          visibleWhen: [{ field: "facilityManagementTeam",
             equals: "available" }],
          columns: [
            {
              key: "position",
              label: "Position/Designation",
              type: "select",
              options: positionOptions,
              width: "50%",
            },
            {
              key: "positionOther",
              label: "If Other, specify",
              type: "text",
              width: "50%",
            },
          ],
          minRows: 3,
        },
        {
          name: "facilityManagementMinutes",
          label: "Minutes of meetings",
          type: "select",
          options: availableOptions,
          visibleWhen: [{ field: "facilityManagementTeam", equals: "available" }],
        },
        {
          name: "facilityManagementLastMeetingDate",
          label: "Date of last meeting",
          type: "date",
          visibleWhen: [{ field: "facilityManagementMinutes", equals: "available" }],
        },

        {
          name: "qualityImprovementTeam",
          label: "ii. Facility Quality Improvement Team",
          type: "select",
          options: availableOptions,
        },
        {
          name: "qualityImprovementMembers",
          label: "Quality Improvement Team Members",
          type: "table",
          visibleWhen: [{ field: "qualityImprovementTeam", equals: "available" }],
          columns: [
            {
              key: "position",
              label: "Position/Designation",
              type: "select",
              options: positionOptions,
              width: "50%", 
            },
            {
              key: "positionOther",
              label: "If Other, specify",
              type: "text",
              width: "50%",
            },
          ],
          minRows: 3,
        },
        {
          name: "qualityImprovementMinutes",
          label: "Minutes of meetings",
          type: "select",
          options: availableOptions,
          visibleWhen: [{ field: "qualityImprovementTeam", equals: "available" }],
        },
        {
          name: "qualityImprovementLastMeetingDate",
          label: "Date of last meeting",
          type: "date",
          visibleWhen: [{ field: "qualityImprovementMinutes", equals: "available" }],
        },

        {
          name: "mtcAvailable",
          label: "iii. Medicines and Therapeutics Committee (if Hospital)",
          type: "select",
          options: availableOptions,
        },
        {
          name: "mtcMembers",
          label: "MTC Core Members",
          type: "table",
          visibleWhen: [{ field: "mtcAvailable", equals: "available" }],
          columns: [
            {
              key: "position",
              label: "Position/Designation",
              type: "select",
              options: positionOptions,
            },
            {
              key: "positionOther",
              label: "If Other, specify",
              type: "text",
              width: "50%",
            }
          ],
          minRows: 3,
        },
        {
          name: "mtcMinutes",
          label: "Minutes of meetings",
          type: "select",
          options: availableOptions,
          visibleWhen: [{ field: "mtcAvailable", equals: "available" }],
        },
        {
          name: "mtcLastMeetingDate",
          label: "Date of last meeting",
          type: "date",
          visibleWhen: [{ field: "mtcMinutes", equals: "available" }],
        },

        {
          name: "hptReceiptFocalPersons",
          label: "iv. HPT Receipt Focal Person(s)",
          type: "multiselect",
          options: positionOptions,
        },
        {
          name: "hptReceiptOther",
          label: "Other focal person (specify)",
          type: "text",
          visibleWhen: [{ field: "hptReceiptFocalPersons", includes: "other" }], 
        },
        {
          name: "advanceDeliveryAlert",
          label: "For the last KEMSA/other suppliers’ delivery, did the healthcare facility receive advance alert of the dispatch and delivery time? ",
          type: "radio",
          options: yesNoOptions,
        },
        {
          name: "haswasteDisposalCommitteeMembers",
          label: "v. Is there a waste management/disposal committee?",
          type: "select",
          options: yesNoOptions,
        },
        {
          name: "wasteDisposalCommitteeMembers",
          label: "List the Waste Management/Disposal Committee Members",
          type: "table",
          visibleWhen: [{ field: "haswasteDisposalCommitteeMembers", equals: "yes" }],
          columns: [
            {
              key: "position",
              label: "Position/Designation",
              type: "select",
              options: positionOptions,
            },
            {
              key: "positionOther",
              label: "If Other, specify",
              type: "text",
            },
          ],
          minRows: 3,
        },
        {
          name: "wasteDisposalDocsFO58",
          label: "Availability of FO58 Form",
          type: "select",
          options: availableOptions,
        },
        {
          name: "wasteDisposalMinutes",
          label: "Minutes of Waste Management meetings",
          type: "select",
          options: availableOptions,
          visibleWhen: [{ field: "haswasteDisposalCommitteeMembers", equals: "yes" }],
        },
        {
          name: "lastDisposalDate",
          label: "Date of last disposal activity",
          type: "date",
          helperText: "Note: If date is unknown or not remembered, please enter 01/01/1900.",
          placeholder: "dd/mm/yyyy"
        },
      ],
    },
    {
      title: "C. Treatment Services Offered",
      fields: [
        {
          name: "treatmentServices",
          label: "Treatment Services Offered",
          type: "table",
          columns: [
            { key: "service", label: "Service", type: "text", readOnly: true },
            { key: "isYes", label: "Yes", type: "checkbox", width: "20%" },
            { key: "isNo", label: "No", type: "checkbox", width: "20%" },
          ],
          defaultValue: [
            { service: "Outpatient clinic", isYes: false, isNo: false },
            { service: "MCH/FP", isYes: false, isNo: false },
            { service: "Maternity services – Normal deliveries", isYes: false, isNo: false },
            { service: "Maternity services (Comprehensive Emergency Obstetric Care)", isYes: false, isNo: false },
            { service: "HIV Comprehensive Care Clinic (CCC)", isYes: false, isNo: false },
            { service: "TB Clinic (Routine)", isYes: false, isNo: false },
            { service: "TB Clinic (MDR Treatment)", isYes: false, isNo: false },
            { service: "Inpatient services", isYes: false, isNo: false },
          ],
          minRows: 8,
        },
      ],
    },
    {
      title: "D. Laboratory Tests Offered",
      fields: [
        {
          name: "hasLaboratory",
          label: "Is there a laboratory in the facility?",
          type: "radio", 
          options: yesNoOptions, 
        },
        {
          name: "laboratoryTests",
          label: "Does the lab do these specific tests?",
          type: "table",
          visibleWhen: [{ field: "hasLaboratory", equals: "yes" }],
          columns: [
            { key: "test", label: "TEST", type: "text", readOnly: true, width: "60%" },
            { key: "isYes", label: "Yes", type: "checkbox", width: "20%" },
            { key: "isNo", label: "No", type: "checkbox", width: "20%" },
          ],
          defaultValue: [
            { test: "Hemoglobin", isYes: false, isNo: false },
            { test: "Urinalysis", isYes: false, isNo: false },
            { test: "Blood sugar", isYes: false, isNo: false },
            { test: "VDRL", isYes: false, isNo: false },
            { test: "Malaria RDT", isYes: false, isNo: false },
            { test: "Microscopy - routine", isYes: false, isNo: false },
            { test: "Microscopy - TB", isYes: false, isNo: false },
            { test: "HIV Screening test", isYes: false, isNo: false },
            { test: "HIV confirmatory test", isYes: false, isNo: false },
            { test: "Gene Xpert", isYes: false, isNo: false },
            { test: "CD4", isYes: false, isNo: false },
            { test: "HIV Viral Load", isYes: false, isNo: false },
            { test: "HIV Early Infant Diagnosis", isYes: false, isNo: false },
            { test: "Cervical cancer screening", isYes: false, isNo: false },
          ],
        },
      ],
    },
    {
      title: "E. In Conclusion",
      fields: [
        makeSectionSummary(
          "Facility Governance and Services",
          "facilityGovernanceAndServicesConclusion"
        ),
      ],
    },
  ],
};