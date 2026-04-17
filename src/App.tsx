import React, { useEffect, useState } from "react";
import Header from "./components/common/Header";
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

// Storage Keys
const STORAGE_KEY = "jss_checklist_draft";
const SECTION_KEY = "jss_current_section";

const App: React.FC = () => {
  // --- Initialize State from LocalStorage (Save & Continue Logic) ---
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  const [currentSection, setCurrentSection] = useState(() => {
    const saved = localStorage.getItem(SECTION_KEY);
    return saved ? parseInt(saved, 10) : 1;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>("");

  // --- Auto-save to LocalStorage whenever data or section changes ---
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    localStorage.setItem(SECTION_KEY, currentSection.toString());
    
    // Optional: Update a timestamp to show the user it's saved
    const now = new Date();
    setLastSaved(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
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

  // --- Scroll to top whenever the section changes ---
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentSection]);

  // --- Submit Logic ---
  const handleSubmit = async () => {
    if (!window.confirm("Are you sure you want to submit the final report?")) return;
    
    setIsSubmitting(true);
    try {
      const googleScriptUrl = "https://script.google.com/macros/s/AKfycbyXEomRwa5hV6oQHszocTzWE9AggmuLK7csxLlpkg1mss0fcant9UT70eJYx-XWOlr5/exec";
      
      await fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors", 
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      alert("Form submitted successfully!");

      // --- Clear Storage after successful submission ---
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SECTION_KEY);
      setFormData({});
      setCurrentSection(1);

    } catch (error) {
      alert("There was an error submitting the form. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSeeResults = () => {
    const googleSheetUrl = "https://docs.google.com/spreadsheets/d/1tP3ypIsZDWEBG-rH7O7TUTVzzrcQI71VL1K-aJ201HQ/edit?gid=0#gid=0";
    window.open(googleSheetUrl, "_blank");
  };

  // Helper to clear draft manually if needed
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
      <div
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          padding: "24px 20px 40px 20px",
        }}
      >
        <Header /> 

        {/* Auto-save Status Indicator */}
        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#6c757d', marginBottom: 10 }}>
          {formData && Object.keys(formData).length > 0 ? `Draft auto-saved at ${lastSaved}` : "New Interview"}
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentSection(num)}
              className={`section-tab ${currentSection === num ? "active" : ""}`}
              type="button"
            >
              Section {num}
            </button>
          ))}
        </div>

        {renderSection()}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 30,
            paddingTop: 20,
            borderTop: "2px solid #e9ecef"
          }}
        >
          {/* Left Side: Navigation */}
          <div>
            <button
              type="button"
              onClick={() => setCurrentSection((prev) => Math.max(prev - 1, 1))}
              disabled={currentSection === 1}
              style={{ marginRight: 10 }}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setCurrentSection((prev) => Math.min(prev + 1, 9))}
              disabled={currentSection === 9}
            >
              Next
            </button>
          </div>

          {/* Right Side: Database Actions */}
          <div>
            <button
              type="button"
              onClick={handleReset}
              style={{ backgroundColor: "#dc3545", marginRight: 10, color: "white" }}
            >
              Clear Draft
            </button>
            
            <button
              type="button"
              onClick={handleSeeResults}
              style={{ backgroundColor: "#6c757d", marginRight: 15 }}
            >
              See Results
            </button>

            {currentSection === 9 && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{ backgroundColor: "#28a745" }}
              >
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