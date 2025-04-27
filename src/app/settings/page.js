"use client"
import { useEffect, useState } from "react"
import "./settings.css"

function Settings() {
  const [page , setPage] = useState("font");
  const [font,setFont] = useState("inter");
  const [theme,setTheme] = useState(false);

  return(
    <div className="setting-area">
      <h2>Settings</h2>
      <div className="buttons">
        <button onClick={() => setPage('Theme')}><img src={!theme ? "./assets/images/light-mode-icon.svg" : "./assets/images/button-theme-dark.svg"}/></button>
        <button onClick={() => setPage('font')}><img src= {!theme ? "./assets/images/font-icon.svg": "./assets/images/button-font-dark.svg"}/></button>
      </div>
      {page === "font" ? <FontArea font={font} setFont = {setFont}/> : <ThemeArea theme={theme} setTheme={setTheme}/>}
    </div>
  )
}

function FontArea({font, setFont}) {
  
 

  useEffect(() => {
    document.body.style.fontFamily = font;
  }, [font]);

  return (
    <div className="font-area" >
      <h2>Font Theme</h2>
      <p>Choose your font theme:</p>

      <label htmlFor="inter">
        <div className="font">
          <div className="font-flex">
            <div>
              <img src="./assets/images/sans-font-icon.svg"/>
            </div>
            <div>
              <h3>Inter</h3>
              <p>Default font for this Application</p>
            </div>
          </div>
          <div>
            <input type="radio" id="inter" name="font-theme" value="inter" checked = {font === "inter"} onChange={(e) => setFont(e.target.value)} />
            <span className="custom-radio"></span>
          </div>
        </div>
      </label>

      <label htmlFor="sans-serif">
        <div className="font">
          <div className="font-flex">
            <div>
              <img src="./assets/images/sans-font-icon.svg" alt="Sans Font Icon"/>
            </div>
            <div>
              <h3>Sans-Serif</h3>
              <p>Clean and modern, easy to read.</p>
            </div>
          </div>
          <div>
            <input type="radio" id="sans-serif" name="font-theme" value="sans-serif" checked = {font === "sans-serif"} onChange={(e) => setFont(e.target.value)} />
            <span className="custom-radio"></span>
          </div>
        </div>
      </label>

      <label htmlFor="serif">
        <div className="font">
          <div className="font-flex">
            <div>
              <img src="./assets/images/serif-font-icon.svg" alt="Serif Font Icon"/>
            </div>
            <div>
              <h3>Serif</h3>
              <p>Classic and elegant for a timeless feel.</p>
            </div>
          </div>
            <div>
            <input type="radio" id="serif" name="font-theme" value="serif" checked = {font === "serif"} onChange={(e) => setFont(e.target.value)} />
            <span className="custom-radio"></span>
          </div>
        </div>
      </label>

      <label htmlFor="monospace">
        <div className="font">
          <div className="font-flex">
            <div>
              <img src="./assets/images/sans-font-icon.svg" alt="Monospace Font Icon"/>
            </div>
            <div>
              <h3>Monospace</h3>
              <p>Code-like, great for a technical vibe.</p>
            </div>
          </div>
          <div>
            <input type="radio" id="monospace" name="font-theme" value="monospace" checked = {font === "monospace"} onChange={(e) => setFont(e.target.value)} />
            <span className="custom-radio"></span>
          </div>
        </div>
      </label>
    </div>
  )
}

function ThemeArea({theme,setTheme}) {

  useEffect(() => {
    if (theme) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return(
    <div className="theme-area">
       <h2>Color Theme</h2>
      <p>Choose your color theme:</p>

      <label htmlFor="light">
        <div className="font">
          <div className="font-flex">
          <div>
            <img src={!theme ? "./assets/images/light-mode-icon.svg" : "./assets/images/sun.svg"} />
          </div>
            <div>
              <h3>Light Mode</h3>
              <p>Pick a clean and classic light theme</p>
            </div>
          </div>
          <div>
            <input type="radio" id="light" name="theme"  checked={theme === false}  onChange={() => setTheme(false)} />
            <span className="custom-radio"></span>
          </div>
        </div>
      </label>

      <label htmlFor="dark">
        <div className="font">
          <div className="font-flex">
            <div>
            <img src={!theme ? "./assets/images/dark-mode-icon.svg" : "./assets/images/dark.svg"} />
            </div>
            <div>
              <h3>Dark Mode</h3>
              <p>Select a sleek and modern dark theme</p>
            </div>
          </div>
          <div>
            <input type="radio" id="dark" name="theme" checked = {theme === true} onChange={() => setTheme(true)}/>
            <span className="custom-radio"></span>
          </div>
        </div>
      </label>
    </div>
  )
}

export default Settings