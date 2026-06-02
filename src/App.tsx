import React, { useEffect, useState } from "react";
import Header from "./components/common/Header";
import Section0 from "./components/sections/Section0"; 
import Section1 from "./components/sections/Section1";
import Section2 from "./components/sections/Section2";
import Section3 from "./components/sections/Section3";
import Section4 from "./components/sections/Section4";
import Section5 from "./components/sections/Section5";
import Section6 from "./components/sections/Section6";
import Section7 from "./components/sections/Section7";
import Section8 from "./components/sections/Section8";
import Section9 from "./components/sections/Section9";
import { applyGlobalFormLogic } from "./utils/FormEngine";

const STORAGE_KEY = "jss_checklist_draft";
const SECTION_KEY = "jss_current_section";

const App: React.FC = () => {
  // Safe state initialization prevents fatal crashes from bad local cache
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Corrupted local storage found. Resetting state safely.", e);
      return {};
    }
  });

  const [currentSection, setCurrentSection] = useState(() => {
    try {
      const saved = localStorage.getItem(SECTION_KEY);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      localStorage.setItem(SECTION_KEY, currentSection.toString());
      
      const now = new Date();
      setLastSaved(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData, currentSection]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      return applyGlobalFormLogic(next);
    });
  };

  useEffect(() => {
    setFormData((prev) => applyGlobalFormLogic(prev));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentSection]);

  const handleSubmit = async () => {
    const isEmpty = (val: any) => val === undefined || val === null || String(val).trim() === "";

    const validateGeneralInfo = (data: Record<string, any>) => {
      const missing: string[] = [];
      const generalFields = [
        "facilityName", 
        "dateOfVisit", 
        "supervisionTeamNo", 
        "teamLeader", 
        "respondentName", 
        "respondentPosition", 
        "respondentPhone"
      ];
      
      generalFields.forEach(f => { 
        if (isEmpty(data[f])) missing.push(f); 
      });
      
      if (data.respondentPosition === "other" && isEmpty(data.respondentPositionOther)) {
        missing.push("respondentPositionOther");
      }
      
      return missing;
    };

    const missingGeneral = validateGeneralInfo(formData);
    
    if (missingGeneral.length > 0) {
      alert(`Please ensure you have filled out all General Information details.\n\nMissing fields: ${missingGeneral.join(", ")}`);
      setCurrentSection(0); 
      return;
    }

    if (!window.confirm("Are you sure you want to submit the final report?")) return;
    
    setIsSubmitting(true);
    
    try {
      const googleScriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string;
      
      const response = await fetch(googleScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === "error") {
        throw new Error(result.message || result.error || "Server rejected the submission.");
      }

      alert("Form submitted successfully!");
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SECTION_KEY);
      setFormData({});
      setCurrentSection(0); 

    } catch (error: any) {
      console.error("Submission failed: ", error);
      alert(`Submission Error: ${error.message || "We couldn't reach the database server."}\n\nYour current inputs have been saved locally in your browser. Please try clicking submit again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSeeResults = () => {
    const googleSheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL as string;
    window.open(googleSheetUrl, "_blank");
  };

  // Clears only the data mapped to the currently active section
  const handleClearSection = () => {
    const sectionName = currentSection === 0 ? "General Info" : `Section ${currentSection}`;
    if (!window.confirm(`Are you sure you want to clear all data for ${sectionName}? This will not affect other tabs.`)) return;

    // Dictionary mapping each section to its specific state keys based on your Apps Script
    const sectionKeys: Record<number, string[]> = {
      0: ["facilityName", "county", "subCounty", "facilityLevel", "ownership", "facilityMflCode", "dateOfVisit", "supervisionTeamNo", "teamLeader", "respondentName", "respondentPosition", "respondentPositionOther", "respondentPhone"],
      1: ["facilityManagementTeam", "facilityManagementMembers", "facilityManagementMinutes", "facilityManagementLastMeetingDate", "qualityImprovementTeam", "qualityImprovementMembers", "qualityImprovementMinutes", "qualityImprovementLastMeetingDate", "mtcAvailable", "mtcMembers", "mtcMinutes", "mtcLastMeetingDate", "hptReceiptFocalPersons", "hptReceiptOther", "advanceDeliveryAlert", "haswasteDisposalCommitteeMembers", "wasteDisposalCommitteeMembers", "wasteDisposalDocsFO58", "wasteDisposalMinutes", "lastDisposalDate", "treatmentServices", "hasLaboratory", "laboratoryTests", "facilityGovernanceAndServicesConclusion"],
      2: ["receivedCommoditySupervisionVisit", "capacityBuildingDone", "capacityBuildingTopics", "capacityBuildingOtherSpecify", "previousActionPoints", "staffTrainedCommodityManagement", "trainingType", "numberTrained", "trainingDuration", "trainingTopic", "hasCME", "cmeFrequency", "receivedDqaVisit", "dqaVisitBy", "dqaRecommendationsReceived", "hasDqaReport", "dqaReportDate", "humanResourceCapacityBuildingConclusion"],
      3: ["treatmentGuidelinesTable", "commodityManagementGuidelinesTable", "diagnosticAlgorithmsTable", "commoditySopsTable"],
      4: ["inventoryToolsTable", "physicalCountTable", "stockCardBalancesTable", "stockOutsTable", "hasExpiredCommodities", "expiredCommoditiesList", "inventoryManagementConclusion"],
      5: ["receiptVerificationTable", "interFacilityTransfersTable", "dispensingTrackingTable", "accountabilityConclusion"],
      6: ["reportingTimelinessTable", "dataConcordanceTable", "hasDataReviewMeetings", "dataReviewMeetingFrequency", "scmReportingConclusion"],
      7: ["storageConditionsTable", "storageCapacityAdequate", "coldChainFunctional", "storageConclusion"],
      8: ["resupplyMechanism", "orderFrequency", "allocationVsRequestTable", "hasOrderCalculationsDocs", "orderingConclusion"],
      9: ["actionPlanTable", "facilityInChargeComments", "supervisionTeamComments", "formFillerSignature"]
    };

    const keysToRemove = sectionKeys[currentSection] || [];

    setFormData((prev) => {
      const nextData = { ...prev };
      keysToRemove.forEach((key) => {
        delete nextData[key]; 
      });
      return applyGlobalFormLogic(nextData);
    });
  };

  const renderSection = () => {
    const props = { formData, onChange: handleChange };
    switch (currentSection) {
      case 0: return <Section0 {...props} />; 
      case 1: return <Section1 {...props} />;
      case 2: return <Section2 {...props} />;
      case 3: return <Section3 {...props} />;
      case 4: return <Section4 {...props} />;
      case 5: return <Section5 {...props} />;
      case 6: return <Section6 {...props} />;
      case 7: return <Section7 {...props} />;
      case 8: return <Section8 {...props} />;
      case 9: return <Section9 {...props} />;
      default: return null;
    }
  };

  return (
    <>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "24px 20px 40px 20px" }}>
        <Header mflCode={formData.facilityMflCode} facilityName={formData.facilityName} /> 

        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#6c757d', marginBottom: 10 }}>
          {formData && Object.keys(formData).length > 0 ? `Draft auto-saved at ${lastSaved}` : "New Interview"}
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 30 }}>
          {Array.from({ length: 10 }, (_, i) => i).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentSection(num)}
              className={`section-tab ${currentSection === num ? "active" : ""}`}
              type="button"
            >
              {num === 0 ? "General Info" : `Section ${num}`}
            </button>
          ))}
        </div>

        {renderSection()}

        <div className="bottom-nav" style={{ display: "flex", justifyContent: "space-between", marginTop: 30, paddingTop: 20, borderTop: "2px solid #e9ecef" }}>
          <div>
            {currentSection !== 0 && ( 
              <button
                type="button"
                onClick={() => setCurrentSection((prev) => Math.max(prev - 1, 0))}
                style={{ marginRight: 10 }}
              >
                Previous
              </button>
            )}
            {currentSection !== 9 && (
              <button
                type="button"
                onClick={() => setCurrentSection((prev) => Math.min(prev + 1, 9))}
              >
                Next
              </button>
            )}
          </div>

          <div>
            <button type="button" onClick={handleClearSection} style={{ backgroundColor: "#dc3545", marginRight: 10, color: "white" }}>
              Clear Current Section
            </button>
            
            <button type="button" onClick={handleSeeResults} style={{ backgroundColor: "#6c757d", marginRight: 15 }}>
              See Results
            </button>

            {currentSection === 9 && (
              <button type="button" onClick={handleSubmit} disabled={isSubmitting} style={{ backgroundColor: "#28a745", color: "white" }}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;