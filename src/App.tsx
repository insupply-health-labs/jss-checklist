import React, { useEffect, useMemo, useState } from "react";
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
import { applyGlobalFormLogic, getMalariaRdtAvailability } from "./utils/FormEngine";

const App: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentSection, setCurrentSection] = useState(1);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      return applyGlobalFormLogic(next);
    });
  };

  useEffect(() => {
    setFormData((prev) => applyGlobalFormLogic(prev));
  }, []);

  // --- NEW: Scroll to top whenever the section changes ---
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Creates a nice gliding animation to the top
    });
  }, [currentSection]);

  const malariaRdtAvailability = useMemo(
    () => getMalariaRdtAvailability(formData),
    [formData]
  );

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
        return malariaRdtAvailability === "no" ? (
          <div
            style={{
              padding: 20,
              border: "1px solid #ddd",
              borderRadius: 12,
              backgroundColor: "#fff",
            }}
          >
            <h2>8. Patient and Commodity Data Triangulation</h2>
            <p style={{ color: "#dc3545", fontWeight: "bold" }}>
              This section is skipped because “Malaria RDT” was marked as not available in Section 1.
            </p>
          </div>
        ) : (
          <Section8 formData={formData} onChange={handleChange} />
        );
      case 9:
        return <Section9 formData={formData} onChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* The Header is now inside this wrapper div so it perfectly 
        shares the 1300px maxWidth and auto-margins with the form! 
      */}
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
            marginTop: 30,
          }}
        >
          <button
            type="button"
            onClick={() => setCurrentSection((prev) => Math.max(prev - 1, 1))}
            disabled={currentSection === 1}
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
      </div>
    </>
  );
};

export default App;