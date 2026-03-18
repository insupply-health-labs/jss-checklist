import { mflFacilities } from "../data/mflFacilities";
import type { Field, VisibleWhenRule } from "../types/form";

const toNumber = (value: any): number => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

const toPercent = (numerator: number, denominator: number): string => {
  if (!denominator || denominator <= 0) return "";
  return ((numerator / denominator) * 100).toFixed(2);
};

export const isFieldVisible = (field: Field, formData: Record<string, any>): boolean => {
  if (!field.visibleWhen || field.visibleWhen.length === 0) return true;
  return field.visibleWhen.every((rule: VisibleWhenRule) => {
    const current = formData[rule.field];
    if (rule.equals !== undefined) return current === rule.equals;
    if (rule.notEquals !== undefined) return current !== rule.notEquals;
    if (rule.includes !== undefined) return Array.isArray(current) && current.includes(rule.includes);
    return true;
  });
};

/**
 * AUTOFILL LOGIC
 * Updated to trigger from facilityName dropdown selection
 */
export const applyMflAutofill = (formData: Record<string, any>): Record<string, any> => {
  const name = String(formData.facilityName || "").trim();
  if (!name) return formData;

  // Find the facility matching the selected name
  const facility = mflFacilities.find((item) => item.facilityName === name);
  if (!facility) return formData;

  // Map the data from your MflFacilityRecord to your form fields
  return {
    ...formData,
    facilityMflCode: facility.mflCode || formData.facilityMflCode || "",
    county: facility.county || formData.county || "",
    subCounty: facility.subCounty || formData.subCounty || "",
    facilityLevel: facility.facilityLevel || formData.facilityLevel || "",
    ownership: facility.ownership === "moh" ? "MOH" : (facility.ownership || formData.ownership || ""),  };
};

export const calculateTableRows = (fieldName: string, rows: Record<string, any>[]): Record<string, any>[] => {
  if (!Array.isArray(rows)) return [];

  return rows.map((row) => {
    const next = { ...row };

    if (fieldName === "stockMovementTable") {
      const physicalCount = toNumber(row.physicalCount);
      const stockCardCount = toNumber(row.stockCardCount);
      const unitCost = toNumber(row.unitCost);
      const qtyIssuedSupplier = toNumber(row.qtyIssuedSupplier);
      const qtyReceivedFacility = toNumber(row.qtyReceivedFacility);
      const qtyBinCard = toNumber(row.qtyBinCard);
      const qtyS11 = toNumber(row.qtyS11);
      const qtyIssuedStore = toNumber(row.qtyIssuedStore);
      const qtyReceivedDispensing = toNumber(row.qtyReceivedDispensing);
      const openingStock = toNumber(row.openingStock);
      const qtyReceived = toNumber(row.qtyReceived);
      const closingBalance = toNumber(row.closingBalance);
      const qtyActuallyIssued = toNumber(row.qtyActuallyIssued);

      next.variance = physicalCount - stockCardCount;
      next.varianceValue = next.variance * unitCost;

      next.deliveryDiscrepancy = qtyIssuedSupplier - qtyReceivedFacility;
      next.deliveryDiscrepancyValue = next.deliveryDiscrepancy * unitCost;

      next.issueVariance = qtyBinCard - qtyS11;
      next.issueVarianceValue = next.issueVariance * unitCost;

      next.storeDispensingDifference = qtyIssuedStore - qtyReceivedDispensing;
      next.storeDispensingVarianceValue = next.storeDispensingDifference * unitCost;

      next.reconciliation = openingStock + qtyReceived - closingBalance;
      next.analysisDifference = next.reconciliation - qtyActuallyIssued;
      next.analysisVarianceValue = next.analysisDifference * unitCost;
    }

    if (fieldName === "malariaScreeningVsMrdt") {
      next.ratio = toPercent(toNumber(row.peopleTested), toNumber(row.mrdtConsumed));
    }
    if (fieldName === "malariaTreatmentTriangulation") {
      next.ratio = toPercent(toNumber(row.alIssued), toNumber(row.positiveCases));
    }
    if (fieldName === "hivScreeningVsRdt") {
      next.ratio = toPercent(toNumber(row.peopleScreened), toNumber(row.trinscreenUsed));
    }
    if (fieldName === "hivTreatmentTriangulation") {
      next.ratio = toPercent(toNumber(row.arvsIssued), toNumber(row.putOnTreatment));
    }

    return next;
  });
};

const thematicAreaMap: Record<string, string> = {
  facilityGovernanceAndServicesConclusion: "Facility Governance & Services",
  humanResourceCapacityBuildingConclusion: "Human Resource Capacity Building",
  availabilityAndUseOfGuidelinesAndSopsConclusion: "Availability & Use of Guidelines and SOPs",
  availabilityAndUseOfRecordsAndReportingFormsConclusion: "Availability and Use of Records & Reporting Forms",
  storageConditionsConclusion: "Storage Conditions",
  pharmacovigilanceConclusion: "Pharmacovigilance",
  stockMovementManagementAndRecordKeepingConclusion: "Stock Movement Management & Record Keeping",
  patientAndProductDataTriangulationConclusion: "Patient and Product Data Triangulation",
};

export const buildOverviewTable1 = (formData: Record<string, any>): Record<string, any>[] => {
  const rows: Record<string, any>[] = [];

  Object.entries(thematicAreaMap).forEach(([summaryFieldName, thematicArea]) => {
    const summaryRows = Array.isArray(formData[summaryFieldName]) ? formData[summaryFieldName] : [];
    const bestPractice = summaryRows.map((r: any) => r.bestPractice).filter(Boolean).join("\n");
    const mainIssues = summaryRows.map((r: any) => r.keyIssueGap).filter(Boolean).join("\n");
    const underlyingCauses = summaryRows.map((r: any) => r.underlyingCause).filter(Boolean).join("\n");
    rows.push({ thematicArea, bestPractice, mainIssues, underlyingCauses });
  });

  return rows;
};

export const buildOverviewTable2 = (formData: Record<string, any>): Record<string, any>[] => {
  const rows: Record<string, any>[] = [];

  Object.entries(thematicAreaMap).forEach(([summaryFieldName, thematicArea]) => {
    const summaryRows = Array.isArray(formData[summaryFieldName]) ? formData[summaryFieldName] : [];
    summaryRows.forEach((r: any) => {
      if (!r?.keyIssueGap) return;
      rows.push({
        thematicArea,
        issueGap: r.keyIssueGap || "",
        desiredResult: "",
        actionRequired: "",
        responsiblePerson: "",
        resourcesNeeded: "",
        completionDate: "",
      });
    });
  });

  return rows;
};

export const applyGlobalFormLogic = (rawFormData: Record<string, any>): Record<string, any> => {
  let next = { ...rawFormData };

  // 1. Run the Autofill logic
  next = applyMflAutofill(next);

  // 2. Run Table Calculations
  const tableFieldsToCalculate = [
    "stockMovementTable",
    "malariaScreeningVsMrdt",
    "malariaTreatmentTriangulation",
    "hivScreeningVsRdt",
    "hivTreatmentTriangulation",
  ];

  tableFieldsToCalculate.forEach((fieldName) => {
    if (Array.isArray(next[fieldName])) {
      next[fieldName] = calculateTableRows(fieldName, next[fieldName]);
    }
  });

  // 3. Build Summary Overview Tables
  next.overviewTable1 = buildOverviewTable1(next);
  next.overviewTable2 = buildOverviewTable2(next);

  return next;
};

export const getMalariaRdtAvailability = (formData: Record<string, any>): string => {
  const tests = Array.isArray(formData.laboratoryTests) ? formData.laboratoryTests : [];
  const malariaRow = tests.find(
    (row: any) => String(row.test || "").toLowerCase().trim() === "malaria rdt"
  );
  return malariaRow?.available || "";
};

// Looks inside the laboratoryTests table for the "HIV Screening test" row
export const getHivScreeningAvailability = (formData: Record<string, any>): string => {
  const labTests = formData.laboratoryTests;
  if (Array.isArray(labTests)) {
    const hivRow = labTests.find((row) => row.test === "HIV Screening test");
    if (hivRow && hivRow.available) {
      return hivRow.available.toLowerCase(); // Returns "yes" or "no"
    }
  }
  return "unknown"; 
};