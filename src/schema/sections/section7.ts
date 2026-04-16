import type { FormSection, TableColumn } from "../../types/form";
import { makeSectionSummary, yesNoOptions } from "../../utils/helpers";

// Define the columns once so we can reuse them across all the sub-tables
const productColumns: TableColumn[] = [
  { key: "parameter", label: "Table: Stock Movement", type: "text", readOnly: true },
  { key: "hivAdult", label: "HIV 1st line adult TDF/3TC/DTG (300/300/ 50mg) 90s", type: "text" }, 
  { key: "hivPaed", label: "HIV 1st line paed – ABC+3TC+ DTG (60/30/5mg) 90s", type: "text" },
  { key: "hivRdt", label: "HIV RDT - Trinscreen", type: "text" },
  { key: "tbAdult", label: "1st line adults – Patient packs RHZE pack", type: "text" },
  { key: "tbPaed", label: "1st line paeds – RHZ 84s", type: "text" },
  //{ key: "tb2ndLine", label: "2nd line – Bedaquiline (100 mg) 188s", type: "text" },
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
      description: "The value calculation may potentially be done by the HPM mentor/(sub)county pharmacist in charge following the visit, rather than during the JSS visit, in order to save time. The value calculations should be included in the reports at the moment of uploading.",
      fields: [
        {
          name: "stockCardAccuracy",
          label: "Stock Card Accuracy at Health Facility (At time of visit)",
          isFixed: true,
          type: "table",
          columns: productColumns,
          defaultValue: [
            { id: "physicalCount", parameter: "Physical count", inputType: "number", min: 0 },
            { id: "stockCardCount", parameter: "Stock card count", inputType: "number", min: 0 },
            { id: "variance", parameter: "Variance", inputType: "number", calculate: "physicalCount - stockCardCount", readOnly: true },
            { id: "unitCost", parameter: "Unit cost of item (*)", inputType: "number", min: 0 },
            { id: "valueOfVariance", parameter: "Value of variance (*)", inputType: "number", calculate: "variance * unitCost", readOnly: true },
            { id: "stockOut3Months", parameter: "Stock-out in last 3 months (Y/N)", inputType: "select", options: yesNoOptions },
            { id: "daysStockedOut", parameter: "Total days stocked out in last 3 months", inputType: "number", min: 0, max: 92 },
          ],
        },
        {
          name: "issuesFromHigherLevel",
          label: "Issues from Higher Level (KEMSA or MEDS) -- Latest Delivery at Health Facility",
          isFixed: true,
          type: "table",
          columns: productColumns,
          defaultValue: [
            { id: "deliveryNote", parameter: "Delivery Note number", inputType: "text" },
            { id: "endorsed", parameter: "Endorsed Delivery Note? (Y/N)", inputType: "select", options: yesNoOptions },
            { id: "qtyIssued", parameter: "Quantity issued by KEMSA/MEDS", inputType: "number", min: 0 },
            { id: "qtyReceived", parameter: "Quantity received by the HF", inputType: "number", min: 0 },
            { id: "discrepancy", parameter: "Discrepancy (auto-calculate)", inputType: "number", calculate: "qtyIssued - qtyReceived", readOnly: true },
            { id: "reason", parameter: "Reason for discrepancy", inputType: "text" },
            { id: "valVariance", parameter: "Calculate value of variance (Ksh)", inputType: "number", calculateTable: "stockCardAccuracy", calculate: "discrepancy * unitCost", readOnly: true },
            { id: "sopAssessment", parameter: "Assess how discrepancy is resolved", inputType: "text" },
            { id: "electronicBin", parameter: "Does the HF have electronic bin cards? (Y/N)", inputType: "select", options: yesNoOptions },
          ],
        },
        {
          name: "issuesToLowerFacilities",
          label: "Issues to Other/Lower Health Facilities",
          isFixed: true,
          type: "table",
          columns: productColumns,
          defaultValue: [
            { id: "didIssue", parameter: "Did the HF issue quantity to other HFs? (Y/N)", inputType: "select", options: yesNoOptions },
            { id: "qtyBinCard", parameter: "Quantity issued as per Bin Card", inputType: "number", min: 0 },
            { id: "qtyS11", parameter: "Quantity issued as per S11s available", inputType: "number", min: 0 },
            { id: "varianceS11", parameter: "Variance", inputType: "number", calculate: "qtyBinCard - qtyS11", readOnly: true },
            { id: "valVarianceS11", parameter: "Value of variance", inputType: "number", calculateTable: "stockCardAccuracy", calculate: "varianceS11 * unitCost", readOnly: true },
          ],
        },
        {
          name: "storeToDispensingUnit",
          label: "From Health Facility Store to Dispensing Unit",
          isFixed: true,
          type: "table",
          columns: productColumns,
          defaultValue: [
            { id: "recordsKept", parameter: "Are records kept for issues to dispensing unit? (Y/N)", inputType: "select", options: yesNoOptions },
            { id: "qtyIssuedStore", parameter: "Latest qty issued from HF store", inputType: "number", min: 0 },
            { id: "qtyReceivedDispensing", parameter: "Qty received by dispensing unit", inputType: "number", min: 0 },
            { id: "diffStoreDispensing", parameter: "Difference between store vs dispensing", inputType: "number", calculate: "qtyIssuedStore - qtyReceivedDispensing", readOnly: true },
            { id: "reasonVariance", parameter: "Reasons for variances?", inputType: "text" },
            { id: "valVarianceDisp", parameter: "Value of variances (Ksh)", inputType: "number", calculateTable: "stockCardAccuracy", calculate: "diffStoreDispensing * unitCost", readOnly: true },
          ],
        },
        {
          name: "stockMovementAnalysis",
          label: "Stock Movement Analysis (Facility) - Review Period = Past Calendar Year (2024)",
          isFixed: true,
          type: "table",
          columns: productColumns,
          defaultValue: [
            { id: "A", parameter: "Opening stock 01 January 2022 (A)", inputType: "number", min: 0 },
            { id: "B", parameter: "Qty received (B)", inputType: "number", min: 0 },
            { id: "C", parameter: "Closing balance (C)", inputType: "number", min: 0 },
            { id: "D", parameter: "Reconciliation (D) = A+B-C", inputType: "number", calculate: "(A + B) - C", readOnly: true },
            { id: "E", parameter: "Qty actually issued (E)", inputType: "number", min: 0 },
            { id: "F", parameter: "Difference (F) = D - E", inputType: "number", calculate: "D - E", readOnly: true },
            { id: "reasonDiff", parameter: "Establish reasons for differences", inputType: "text" },
            { id: "valVarianceAnalysis", parameter: "Value of variance (*)", inputType: "number", calculateTable: "stockCardAccuracy", calculate: "F * unitCost", readOnly: true },
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