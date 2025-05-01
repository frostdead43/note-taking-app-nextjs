"use client"
import "./settings.css"
import "../globals.css"
import Link from "next/link"

export default function Page() {
  return (
    <div className="container">
      <h2>Settings</h2>
      <div className="settings-area">

      <Link href="/settings/theme">
        <div className="setting">
          <img src="./images/light-mode-icon.svg"/>
          <h5>Color Theme</h5>     
        </div>
      </Link>

      <Link href="/settings/fonts">
        <div className="setting">
          <img src="./images/font-icon.svg"/>
          <h5>Font Theme</h5>     
        </div>
      </Link>

      <Link href="/settings/password">
        <div className="setting">
          <img src="./images/password-icon.svg"/>
          <h5>Change Password</h5>     
        </div>
      </Link>

      <Link href="/settings/logout">
        <div className="setting">
          <img src="./images/logout-icon.svg"/>
          <h5>Logout</h5>     
        </div>
      </Link>

      </div>
    </div>
  )
}