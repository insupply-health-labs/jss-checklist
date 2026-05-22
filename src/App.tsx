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
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  // Default to 0 (General Info) instead of 1
  const [currentSection, setCurrentSection] = useState(() => {
    const saved = localStorage.getItem(SECTION_KEY);
    return saved ? parseInt(saved, 10) : 0;
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

    // Validate General Info (Section 0) ONLY
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
      // Improved alert to show exactly what the system thinks is missing!
      alert(`Please ensure you have filled out all General Information details.\n\nMissing fields: ${missingGeneral.join(", ")}`);
      setCurrentSection(0); 
      return;
    }


    if (!window.confirm("Are you sure you want to submit the final report?")) return;
    
    setIsSubmitting(true);
    try {
      const googleScriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string;
      await fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(formData),
      });

      alert("Form submitted successfully!");
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SECTION_KEY);
      setFormData({});
      setCurrentSection(0); 

    } catch (error) {
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSeeResults = () => {
    const googleSheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL as string;
    window.open(googleSheetUrl, "_blank");
  };

  const handleReset = () => {
    if (window.confirm("This will delete all current progress. Are you sure?")) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SECTION_KEY);
      window.location.reload();
    }
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
            <button type="button" onClick={handleReset} style={{ backgroundColor: "#dc3545", marginRight: 10, color: "white" }}>
              Clear Draft
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