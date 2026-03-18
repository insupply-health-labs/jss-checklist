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

const App: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentSection, setCurrentSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    try {
      // Google Apps Script Web App URL
      const googleScriptUrl = "https://script.google.com/macros/s/AKfycbwnXH41e8s2ljvxdRs9bWxxngCI4AR0jL_DKbXqoaS2s56M7KpvjUll2Z9-lgzIgEZX/exec";
      
      await fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors", 
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      alert("Form submitted successfully!");
    } catch (error) {
      alert("There was an error submitting the form. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- See Results Logic ---
  const handleSeeResults = () => {
    // UPDATED: Your exact Google Sheet URL
    const googleSheetUrl = "https://docs.google.com/spreadsheets/d/1tP3ypIsZDWEBG-rH7O7TUTVzzrcQI71VL1K-aJ201HQ/edit?gid=0#gid=0";
    window.open(googleSheetUrl, "_blank");
  };

  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return <Section1 formData={formData} onChange={handleChange} />;
      case 2:
        return <Section2 formData={formData} onChange={handleChange} />;
      case 3:
        return <Section3 formData={formData} onChange={handleChange} />;
      case 4:
        return <Section4 formData={formData} onChange={handleChange} />;
      case 5:
        return <Section5 formData={formData} onChange={handleChange} />;
      case 6:
        return <Section6 formData={formData} onChange={handleChange} />;
      case 7:
        return <Section7 formData={formData} onChange={handleChange} />;
      case 8:
        return <Section8 formData={formData} onChange={handleChange} />;
      case 9:
        return <Section9 formData={formData} onChange={handleChange} />;
      default:
        return null;
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
              onClick={handleSeeResults}
              style={{ backgroundColor: "#6c757d", marginRight: 15 }}
            >
              See Results
            </button>

            {/* Show "Submit" only on the final section */}
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