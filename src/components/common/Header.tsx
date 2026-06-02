import React from "react";
import "../../App.css";
const basePath = import.meta.env.VITE_BASE_FRONTEND_PATH as string;

/**
 * Props for the Header component to display dynamic facility information
 * globally across all form sections.
 */
interface HeaderProps {
  mflCode?: string | number;
  facilityName?: string;
}

const Header: React.FC<HeaderProps> = ({ mflCode, facilityName }) => {
  return (
    <div className="header-container">
      {/* Main Official Letterhead Banner */}
      <div className="header-banner">
        <div className="header-logo-container">
          <img src={`${basePath}/coat-of-arms.png`} alt="Left Crest" className="header-logo" />
        </div>
        
        <div className="header-titles">
          <h1 className="title-line">HEALTH PRODUCTS MANAGEMENT SYSTEMS</h1>
          <h2 className="title-line">JOINT HEALTH PRODUCTS AND TECHNOLOGIES SUPPORTIVE SUPERVISION (JSS)</h2>
        </div>
        
        <div className="header-logo-container">
          <img src={`${basePath}/coat-of-arms.png`} alt="Right Crest" className="header-logo" />
        </div>
      </div>

      {/* Global Facility Information Bar
        This section only renders if a facility has been selected, providing continuous 
        context (MFL Code and Facility Name) to the user regardless of the active tab.
      */}
      {(mflCode || facilityName) && (
        <div 
          className="global-facility-info" 
          style={{
            backgroundColor: "#e6f2ff", 
            padding: "10px 20px",
            textAlign: "center",
            fontWeight: "600",
            borderBottom: "1px solid #b3d4ff",
            color: "#004085"
          }}
        >
          {facilityName && (
            <span style={{ marginRight: "30px" }}>
              Facility: {facilityName}
            </span>
          )}
          {mflCode && (
            <span>
              MFL Code: {mflCode}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
