"use client"
import "./theme.css"

export default function Page() {
  return(
  <div className="container">
    <div className="theme-area">
      <h2>Color Theme</h2>
      <p>Choose your color theme:</p>

   <label htmlFor="light">
     <div className="font">
       <div className="font-flex">
       <div>
         <img src="../images/light-mode-icon.svg"/>
       </div>
         <div>
           <h3>Light Mode</h3>
           <p>Pick a clean and classic light theme</p>
         </div>
       </div>
       <div>
         <input type="radio" id="light" name="theme"/>
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
         <input type="radio" id="dark" name="theme"/>
         <span className="custom-radio"></span>
       </div>
     </div>
   </label>
 </div>
 </div>
  )
}