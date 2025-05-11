"use client"
import "./change-password.css"

export default function Password() {
  return(
    <div className="password-container">
      <div>
        <h2>Change Password</h2>
        <form>
          <h6>Old Password</h6>
          <input className="password-input" type="text" />
        </form>
      </div>
      <div>
          <h6>New Password</h6>
          <input className="password-input" type="text" />
          <span>At least 8 characters</span>
      </div>
      <div>
          <h6>Confirm New Password</h6>
          <input className="password-input" type="text" />
      </div>
      <button className="password-save-btn">Save Password</button>
    </div>
  )
}