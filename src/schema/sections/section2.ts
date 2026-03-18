import type { FormSection } from "../../types/form";
import { doneOptions, makeSectionSummary, yesNoOptions } from "../../utils/helpers";

export const section2: FormSection = {
  id: "section2",
  title: "2. Human Resource Capacity Building",
  groups: [
    {
      title: "A. FOCUS ON COMMODITY MANAGEMENT SUPERVISION",
      fields: [
        {
          name: "receivedCommoditySupervisionVisit",
          label: "i. Have you received a commodity management supervisory visit in the last 3 months? (Check for evidence)",
          type: "radio",
          options: yesNoOptions,
        },
        /*{
          name: "commoditySupervisionBy",
          label: "By who? Indicate designation(s) ",
          type: "multiselect",
          visibleWhen: [{ field: "receivedCommoditySupervisionVisit", equals: "yes" }],
          options: [
            { label: "National", value: "national" },
            { label: "CHMT", value: "chmt" },
            { label: "SCHMT", value: "schmt" },
            { label: "Partners", value: "partners" },
          ],
        },*/
        {
          name: "capacityBuildingDone",
          label: "ii. Did the supervision team perform any capacity building on commodity management?",
          type: "radio",
          options: yesNoOptions,
          visibleWhen: [{ field: "receivedCommoditySupervisionVisit", equals: "yes" }],
        },
        {
          name: "capacityBuildingTopics",
          label: "Which topics did they cover?",
          type: "table",
          visibleWhen: [{ field: "capacityBuildingDone", equals: "yes" }],
          columns: [
            { key: "topic", label: "Topic", type: "text", readOnly: true },
            { key: "covered", label: "YES/NO", type: "select", options: yesNoOptions },
          ],
          defaultValue: [
            { no: 1, topic: "Receiving", covered: "" },
            { no: 2, topic: "Storage Practices", covered: "" },
            { no: 3, topic: "Issuing", covered: "" },
            { no: 4, topic: "Reporting & Requesting", covered: "" },
            { no: 5, topic: "Information management", covered: "" },
            { no: 6, topic: "Pharmacovigilance", covered: "" },
            { no: 7, topic: "Others (Specify)", covered: "" },
          ],
          minRows: 7,
        },
        {
          name: "previousActionPoints",
          label: "iii. Review the action points agreed upon at the last commodity supervision visit, if any (allow skip if ‘No’ is selected above)",
          type: "table",
          visibleWhen: [{ field: "capacityBuildingDone", equals: "yes" }],
          columns: [
            { key: "actionPoint", label: "Previous Action point", type: "textarea" },
            { key: "status", label: "Status Done/Not Done", type: "select", options: doneOptions },
            { key: "reasonNotDone", label: "Reason for Not done", type: "textarea" },
          ],
          minRows: 2,
        },
        {
          name: "staffTrainedCommodityManagement",
          label: "iv. Has any of the departmental staff attended any commodity management training (in person or online) in the last 1 year?",
          type: "radio",
          options: yesNoOptions,
        },
        { 
          name: "numberTrained", 
          label: "Number of staff trained", 
          type: "number",
          visibleWhen: [{ field: "staffTrainedCommodityManagement", equals: "yes" }] 
        },
        { 
          name: "trainingStartDate", 
          label: " Start Date of training", 
          type: "date",
          visibleWhen: [{ field: "staffTrainedCommodityManagement", equals: "yes" }] 
        },
        {
          name: "trainingEnddate", 
          label: "End Date of training", 
          type: "date",
          visibleWhen: [{ field: "staffTrainedCommodityManagement", equals: "yes" }]
        },
        { 
          name: "trainingTopic", 
          label: "Topic of training:", 
          type: "text",
          visibleWhen: [{ field: "staffTrainedCommodityManagement", equals: "yes" }] 
        },
        {
          name: "hasCME",
          label: "v. Does the facility have a Continuing Medical Education (CME) system/ structure?",
          type: "radio",
          options: yesNoOptions,
        },
        {
          name: "cmeFrequency",
          label: "How often are the CMEs done? (Ask to see evidence - schedule, minutes, register, attendance lists etc)",
          type: "select",
          visibleWhen: [{ field: "hasCME", equals: "yes" }],
          options: [
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
            { label: "Quarterly", value: "quarterly" },
            { label: "Adhoc", value: "adhoc" },
          ],
        },
      ],
    },
    {
      title: "B. FOCUS ON COMMODITY DATA QUALITY ASSURANCE (DQA)",
      fields: [
        {
          name: "receivedDqaVisit",
          label: "i. Have you received a Data Quality Assurance visit in the last 3 months?",
          type: "radio",
          options: yesNoOptions,
        },
        {
          name: "dqaVisitBy",
          label: "By who?",
          type: "multiselect",
          visibleWhen: [{ field: "receivedDqaVisit", equals: "yes" }],
          options: [
            { label: "National", value: "national" },
            { label: "CHMT", value: "chmt" },
            { label: "SCHMT", value: "schmt" },
            { label: "Partners", value: "partners" },
          ],
        },
        {
          name: "dqaRecommendationsReceived",
          label: "ii. Did you receive/do you recall any recommendations or capacity building to improve accuracy, completeness, and/or timeliness?",
          type: "radio",
          options: yesNoOptions,
          visibleWhen: [{ field: "receivedDqaVisit", equals: "yes" }],
        },
        {
          name: "hasDqaReport",
          label: "iii. Do you have a copy of DQA findings/recommendations report?",
          type: "radio",
          options: yesNoOptions,
          visibleWhen: [{ field: "receivedDqaVisit", equals: "yes" }],
        },
        { 
          name: "dqaReportDate", 
          label: "Date on evidence/report", 
          type: "date",
          visibleWhen: [{ field: "hasDqaReport", equals: "yes" }],
        },
        makeSectionSummary(
          "C. Human Resource Capacity Building",
          "humanResourceCapacityBuildingConclusion"
        ),
      ],
    },
  ],
};