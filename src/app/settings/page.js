"use client"
import "./settings.css"
import "../globals.css"
import Link from "next/link"


export default function Settings({screenSize, setSelectedArea}) {
  return (
    <div className="container">
      <h2>Settings</h2>
      <div className="settings-area">

        <Link onClick={() => setSelectedArea("color")} href={screenSize > 768 ? `#` : `/settings/theme`}>
          <div className="setting">
            <img src="./images/light-mode-icon.svg" />
            <h5>Color Theme</h5>
          </div>
        </Link>

        <Link onClick={() => setSelectedArea("fonts")} href={screenSize > 768 ? `#` : `/settings/fonts`}>
          <div className="setting">
            <img src="./images/font-icon.svg" />
            <h5>Font Theme</h5>
          </div>
        </Link>

        <Link onClick={() => setSelectedArea("password")} href={screenSize > 768 ? `#` : `/settings/password`}>
          <div className="setting">
            <img src="./images/password-icon.svg" />
            <h5>Change Password</h5>
          </div>
        </Link>

        <Link href={screenSize > 768 ? `#` : `/settings/logout`}>
          <div className="setting">
            <img src="./images/logout-icon.svg" />
            <h5>Logout</h5>
          </div>
        </Link>

      </div>
    </div>
  )
}