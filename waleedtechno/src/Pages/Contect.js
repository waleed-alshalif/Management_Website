import React from "react";

export default function Contact() {
  return (
    <div className="contact-section">
      <div className="company-image">
        <img
          src={require("../img/Profile.png")}
          alt="Waleed Techno Company"
          className="company-img"
        />
      </div>
      <div className="company-info">
        <h2>About Waleed Techno Company</h2>
        <p>
          Waleed Techno is a leading tech company specializing in providing
          innovative solutions to help businesses thrive in the digital world.
          Our goal is to create impactful technology that transforms industries
          and improves lives.
        </p>
      </div>
    </div>
  );
}
