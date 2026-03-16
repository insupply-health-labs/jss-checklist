import type { FormSection } from "../../types/form";
import {
  availableOptions,
  makeSectionSummary,
  yesNoOptions,
} from "../../utils/helpers";
import { mflFacilities } from "../../data/mflFacilities"; 

const positionOptions = [
  "Facility in charge",
  "Pharmacist",
  "Pharmaceutical technologist",
  "Nursing manager",
  "Laboratory officer",
  "Nutritionist",
  "Public health officer",
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
        { 
          name: "facilityName",
          label: "Facility Name:",
          type: "select", 
          helperText: "Select a facility",
          options: mflFacilities
          .slice()
          .sort((a, b) => a.facilityName.localeCompare(b.facilityName))
          .map((facility: any) => ({
            label: facility.facilityName,
            value: facility.facilityName
          }))
        },
        { name: "dateOfVisit",
           label: "Date of Visit:",
            type: "date" },
        
        { name: "facilityMflCode",
           label: "Facility MFL Code:", 
           type: "text", readOnly: true },
        { name: "supervisionTeamNo",
           label: "Supervision Team No:",
            type: "text" },
        
        { name: "facilityLevel",
           label: "Facility Level:",
            type: "text", 
            readOnly: true },
        { name: "teamLeader",
           label: "Name of Supervision Team Leader:",
            type: "text" },
        
        {
          name: "ownership",
          label: "Ownership (MoH, FBO, Private, Others):",
          type: "text", 
          readOnly: true,
        },
        { name: "respondentName", 
          label: "Name of Respondent:", 
          type: "text" },
        
        { name: "county", 
          label: "County:",
           type: "text",
           readOnly: true },
        {
          name: "respondentPosition",
          label: "Position/Designation of Respondent:",
          type: "select",
          options: positionOptions,
        },
        
        { name: "subCounty", 
          label: "Sub-county:",
           type: "text", 
           readOnly: true },
        { name: "respondentPhone", 
          label: "Tel. Contact of Respondent:",
           type: "text" },
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
          label: "v. Are there waste Management/Disposal Committee Members?",
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
          ],
          minRows: 3,
        },
        {
          name: "wasteDisposalDocs",
          label: "Relevant documentation e.g. FO58, minutes",
          type: "select",
          options: availableOptions,
        },
        {
          name: "lastDisposalDate",
          label: "Date of last disposal activity",
          type: "date",
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
            { key: "available", label: "Yes/No", type: "select", options: yesNoOptions },
          ],
          defaultValue: [
            { service: "Outpatient clinic", available: "" },
            { service: "MCH/FP", available: "" },
            { service: "Maternity services – Normal deliveries", available: "" },
            { service: "Maternity services (Comprehensive Emergency Obstetric Care)", available: "" },
            { service: "HIV Comprehensive Care Clinic (CCC)", available: "" },
            { service: "TB Clinic (Routine)", available: "" },
            { service: "TB Clinic (MDR Treatment)", available: "" },
            { service: "Inpatient services", available: "" },
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
          label: "If yes, does the lab do these specific tests?",
          type: "table",
          visibleWhen: [{ field: "hasLaboratory", equals: "yes" }],
          columns: [
            { key: "test", label: "TEST", type: "text", readOnly: true },
            { key: "available", label: "YES / NO", type: "select", options: yesNoOptions },
          ],
          defaultValue: [
            { test: "Hemoglobin", available: "" },
            { test: "Urinalysis", available: "" },
            { test: "Blood sugar", available: "" },
            { test: "VDRL", available: "" },
            { test: "Malaria RDT", available: "" },
            { test: "Microscopy - routine", available: "" },
            { test: "Microscopy - TB", available: "" },
            { test: "HIV Screening test", available: "" },
            { test: "HIV confirmatory test", available: "" },
            { test: "Gene Xpert", available: "" },
            { test: "CD4", available: "" },
            { test: "HIV Viral Load", available: "" },
            { test: "HIV Early Infant Diagnosis", available: "" },
            { test: "Cervical cancer screening", available: "" },
          ],
          minRows: 14,
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