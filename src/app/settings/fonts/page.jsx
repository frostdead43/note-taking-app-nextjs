"use clien"
import "./fonts.css"

export default function Page() {
  return(
    <div className="container">
      <div className="font-area" >
      <h2>Font Theme</h2>
      <p>Choose your font theme:</p>

      <label htmlFor="inter">
        <div className="font">
          <div className="font-flex">
            <div>
              <img src="../images/sans-font-icon.svg"/>
            </div>
            <div>
              <h3>Inter</h3>
              <p>Default font for this Application</p>
            </div>
          </div>
          <div>
            <input type="radio" id="inter" name="font-theme" value="inter"/>
            <span className="custom-radio"></span>
          </div>
        </div>
      </label>

      <label htmlFor="sans-serif">
        <div className="font">
          <div className="font-flex">
            <div>
              <img src="../images/sans-font-icon.svg" alt="Sans Font Icon"/>
            </div>
            <div>
              <h3>Sans-Serif</h3>
              <p>Clean and modern, easy to read.</p>
            </div>
          </div>
          <div>
            <input type="radio" id="sans-serif" name="font-theme"/>
            <span className="custom-radio"></span>
          </div>
        </div>
      </label>

      <label htmlFor="serif">
        <div className="font">
          <div className="font-flex">
            <div>
              <img src="../images/serif-font-icon.svg" alt="Serif Font Icon"/>
            </div>
            <div>
              <h3>Serif</h3>
              <p>Classic and elegant for a timeless feel.</p>
            </div>
          </div>
            <div>
            <input type="radio" id="serif" name="font-theme" value="serif"/>
            <span className="custom-radio"></span>
          </div>
        </div>
      </label>

      <label htmlFor="monospace">
        <div className="font">
          <div className="font-flex">
            <div>
              <img src="../images/sans-font-icon.svg" alt="Monospace Font Icon"/>
            </div>
            <div>
              <h3>Monospace</h3>
              <p>Code-like, great for a technical vibe.</p>
            </div>
          </div>
          <div>
            <input type="radio" id="monospace" name="font-theme" value="monospace"/>
            <span className="custom-radio"></span>
          </div>
        </div>
      </label>
    </div>
    <button className="font-save-btn">Save Password</button>
    </div>
  )
}