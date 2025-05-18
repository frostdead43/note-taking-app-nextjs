"use client"
import "./theme.css"
import { useState } from "react";

export default function Theme() {
  const [selectedTheme, setSelectedTheme] = useState("light");

  function handleThemeChange(e) {
    const selectedTheme = e.target.value;
    console.log(selectedTheme);
    setSelectedTheme(selectedTheme);
  }

  function handleSaveChanges() {
    if (selectedTheme === "light") {
      document.body.classList.remove("dark-theme");
    } else if (selectedTheme === "dark") {
      document.body.classList.add("dark-theme");
    }
  }

  return (
    <div className="container">
      <div className="theme-area">
        <h2>Color Theme</h2>
        <p>Choose your color theme: {selectedTheme}</p>

        <label htmlFor="light">
          <div className="font">
            <div className="font-flex">
              <div className="lightmode-icon">
               <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.045 2.5V3.64325M10.045 16.3567V17.5M17.5449 10.0001H16.4017M3.68817 10.0001H2.54492M15.3481 4.69652L14.5398 5.50491M5.55022 14.4948L4.74184 15.3032M15.3481 15.3032L14.5398 14.4948M5.55022 5.5053L4.74184 4.69692" stroke="#0E121B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M10.0451 6.50391C11.9764 6.50391 13.5413 8.06959 13.5413 10.0002C13.5413 11.9315 11.9764 13.4972 10.0451 13.4972C8.1137 13.4972 6.54883 11.9315 6.54883 10.0002C6.54883 8.06959 8.1137 6.50391 10.0451 6.50391Z" stroke="#0E121B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              </div>
              <div>
                <h3>Light Mode</h3>
                <p>Pick a clean and classic light theme</p>
              </div>
            </div>
            <div>
              <input type="radio" id="light" name="theme" value="light" onChange={handleThemeChange} />
              <span className="custom-radio"></span>
            </div>
          </div>
        </label>

        <label htmlFor="dark">
          <div className="font">
            <div className="font-flex">
              <div className="darkmode-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.615 21.7229C10.085 21.7229 7.585 20.7529 5.725 18.8829C3.865 17.0129 2.875 14.6029 2.875 12.0029C2.875 9.40288 3.885 6.96294 5.725 5.12294C8.775 2.06294 13.545 1.39293 17.315 3.49293C17.575 3.64293 17.755 3.9729 17.725 4.2729C17.695 4.6029 17.475 4.87292 17.155 4.97291C14.105 5.91291 11.965 8.80288 11.965 12.0029C11.965 15.2129 14.105 18.1029 17.155 19.0229C17.445 19.1129 17.685 19.4029 17.725 19.7029C17.765 20.0029 17.585 20.3529 17.325 20.5029C15.855 21.3229 14.225 21.7229 12.615 21.7229ZM12.615 3.78291C10.475 3.78291 8.365 4.61294 6.785 6.18294C5.205 7.75294 4.375 9.80288 4.375 12.0029C4.375 14.2029 5.225 16.2729 6.785 17.8229C8.995 20.0329 12.275 20.7629 15.175 19.8129C12.345 18.3029 10.475 15.2929 10.475 12.0029C10.475 8.71288 12.345 5.70294 15.165 4.18294C14.335 3.91294 13.465 3.78291 12.615 3.78291ZM16.585 4.80293C16.585 4.80293 16.595 4.80294 16.605 4.81294C16.605 4.81294 16.595 4.81293 16.585 4.80293Z" fill="#0E121B"/>
                  <path d="M18.9741 19.0525C18.7841 19.0525 18.5941 18.9825 18.4441 18.8325C18.1541 18.5425 18.1541 18.0625 18.4441 17.7725C19.9941 16.2225 20.8541 14.1525 20.8541 11.9625C20.8541 9.7725 20.0041 7.7025 18.4441 6.1525C18.1541 5.8625 18.1541 5.3825 18.4441 5.0925C18.7341 4.8025 19.2141 4.8025 19.5041 5.0925C21.3441 6.9325 22.3541 9.3725 22.3541 11.9625C22.3541 14.5525 21.3441 17.0025 19.5041 18.8325C19.3541 18.9825 19.1641 19.0525 18.9741 19.0525Z" fill="#0E121B"/>
                </svg>
              </div>
              <div>
                <h3>Dark Mode</h3>
                <p>Select a sleek and modern dark theme</p>
              </div>
            </div>
            <div>
              <input type="radio" id="dark" name="theme" value="dark" onChange={handleThemeChange} />
              <span className="custom-radio"></span>
            </div>
          </div>
        </label>
      </div>
      <button className="font-save-btn" onClick={handleSaveChanges}>Save Changes</button>
    </div>
  )
}