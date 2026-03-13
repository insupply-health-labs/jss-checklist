import React from "react";
// Make sure this path points to your actual CSS file
import "../../App.css"; 

const Header: React.FC = () => {
  return (
    <div className="header-container">
      {/* Official Letterhead Banner */}
      <div className="header-banner">
        <div className="header-logo-container">
          <img src="/coat-of-arms.png" alt="Left Crest" className="header-logo" />
        </div>
        
        <div className="header-titles">
          <h1 className="title-line">HEALTH PRODUCTS MANAGEMENT SYSTEMS</h1>
          <h2 className="title-line">JOINT HEALTH PRODUCTS AND TECHNOLOGIES SUPPORTIVE SUPERVISION (JSS)</h2>
        </div>
        
        <div className="header-logo-container">
          <img src="/coat-of-arms.png" alt="Right Crest" className="header-logo" />
        </div>
      </div>
    </div>
  );
};

export default Header;