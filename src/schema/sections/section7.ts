import type { FormSection, TableColumn } from "../../types/form";
import { makeSectionSummary } from "../../utils/helpers";

// Define the columns once so we can reuse them across all the sub-tables
const productColumns: TableColumn[] = [
  { key: "parameter", label: "Table: Stock Movement", type: "text", readOnly: true },
  { key: "hivAdult", label: "HIV 1st line adult TDF/3TC/DTG (300/300/ 50mg) 30s & 90s", type: "text" },
  { key: "hivPaed", label: "HIV 1st line paed – ABC+3TC (120/60mg) 30s", type: "text" },
  { key: "hivRdt", label: "HIV RDT - Trinscreen", type: "text" },
  { key: "tbAdult", label: "1st line adults – Patient packs RHZE pack", type: "text" },
  { key: "tbPaed", label: "1st line paeds – RHZ 84s", type: "text" },
  { key: "tb2ndLine", label: "2nd line – Bedaquiline (100 mg)- 188s", type: "text" },
  { key: "genexpert", label: "Genexpert Cartridges piece", type: "text" },
  { key: "al6s", label: "AL, 6s Dose", type: "text" },
  { key: "al24s", label: "AL, 24s Dose", type: "text" },
  { key: "mRdt", label: "mRDTs Test", type: "text" },
];

export const section7: FormSection = {
  id: "section7",
  title: "7. Stock Movement Management and Record Keeping",
  groups: [
    {
      title: "Table: Stock Movement",
      fields: [
        {
          name: "stockCardAccuracy",
          label: "Stock Card Accuracy at Health Facility (At time of visit)",
          type: "table",
          columns: productColumns,
          defaultValue: [
            { parameter: "Physical count" },
            { parameter: "Stock card count" },
            { parameter: "Variance" },
            { parameter: "Unit cost of item (*) Preselect supplier(If KEMSA, pre-populate)" },
            { parameter: "Value of variance (*)" },
            { parameter: "Stock-out in last 3 months (Y/N)" },
            { parameter: "Total days stocked out in last 3 months (should not exceed 92 days)" },
          ],
        },
        {
          name: "issuesFromHigherLevel",
          label: "Issues from Higher Level (KEMSA or MEDS) -- Latest Delivery at Health Facility",
          type: "table",
          columns: productColumns,
          defaultValue: [
            { parameter: "Delivery Note number (Latest delivery)" },
            { parameter: "Did a HF representative endorse the Delivery Note upon receipt? (Y/N)" },
            { parameter: "Quantity issued by KEMSA/ MEDS (check delivery note/invoice)" },
            { parameter: "Quantity received by the HF (Cf. entry in Bin Card)" },
            { parameter: "Discrepancy, if any (auto-calculate)" },
            { parameter: "Reason for discrepancy (make it not mandatory)" },
            { parameter: "Calculate value of variance (Ksh) (*) (autocalculate)" },
            { parameter: "Assess how discrepancy is documented and resolved, E.g. Is there an SOP? Does the staff know of the SOP?" },
            { parameter: "Does the HF have electronic bin cards? (Y/N)" },
          ],
        },
        {
          name: "issuesToLowerFacilities",
          label: "Issues to Other/Lower Health Facilities - Latest Issue from Health Facility to Other/Lower Level Site",
          type: "table",
          columns: productColumns,
          defaultValue: [
            { parameter: "Did the HF issue a given quantity to other HFs? (Latest issue) (Y/N)" },
            { parameter: "Quantity issued to other HFs as per Bin Card (Latest Issue)" },
            { parameter: "Quantity issued to other HFs as per S11s available" },
            { parameter: "Variance" },
            { parameter: "Calculate value of variance (*) (autocalculate)" },
          ],
        },
        {
          name: "storeToDispensingUnit",
          label: "From Health Facility Store to Dispensing Unit",
          type: "table",
          columns: productColumns,
          defaultValue: [
            { parameter: "Are records kept for issues of health products from HF store to dispensing unit? (Y/N)" },
            { parameter: "Latest qty of commodity issued from HF store to dispensing unit (refer to HF store stock card)" },
            { parameter: "Qty received by dispensing unit from HF store according to dispensing unit records" },
            { parameter: "Difference between HF store records vs dispensing unit records" },
            { parameter: "What are the reasons for the variances?" },
            { parameter: "Calculate value of variances (Ksh) (*)" },
          ],
        },
        {
          name: "stockMovementAnalysis",
          label: "Stock Movement Analysis (Facility) - Review Period = Past Calendar Year (i.e. 2024)",
          type: "table",
          columns: productColumns,
          defaultValue: [
            { parameter: "Opening stock 01 January 2022 (A)" },
            { parameter: "Qty received from 1 January to 31st December (B) (include positive adjustments)" },
            { parameter: "Closing balance (C)" },
            { parameter: "Reconciliation (D) = A+B -C" },
            { parameter: "Qty actually issued (E) to dispensing area or other facilities" },
            { parameter: "Difference between qty issued to HFs vs actual quantity issued: F = D - E" },
            { parameter: "Establish reasons for differences" },
            { parameter: "Calculate value of variance (*) (autocalculate)" },
          ],
        },
      ],
    },
    {
      title: "B. IN CONCLUSION (*)",
      fields: [
        makeSectionSummary(
          "Stock Movement Management & Record Keeping",
          "stockMovementConclusion"
        ),
      ],
    },
  ],
};