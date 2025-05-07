
import styles from "./Header.css"

export default function Header() {
  return (
    <header className="header">
      <img src="/images/logo-icon.svg" />
      <h2>Notes</h2>
    </header>
  )
}

export function HeaderMobile() {
  return (
    <header>
      <h2>All Notes</h2>

    </header>

  )
}