import styles from "./Header.module.css"

export default function Header() {
  return(
  <header className= {styles.header}>
    <img src="/images/logo-icon.svg"/>
    <h2>Notes</h2>
  </header>
  )
} 