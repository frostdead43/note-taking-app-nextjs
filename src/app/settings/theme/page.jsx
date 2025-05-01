"use client"
import "./theme.css"
import { useState } from "react";

export default function Page() {
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
              <div>
                <img src="../images/light-mode-icon.svg" />
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
              <div>
                <img src="../images/dark-mode-icon.svg" />
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