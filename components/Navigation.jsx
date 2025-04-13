import Link from "next/link"
import styles from "./Navigation.module.css"

export default function Navigation() {
  return(
    <nav className={styles["menu-bar"]}>
      <ul>
        <Link href="/"><li><img src="/images/home-icon.svg" alt="" /></li></Link>
        <Link href="/search"><li><img src="/images/search-icon.svg" alt="" /></li></Link>
        <Link href="/archive"><li><img src="/images/archive-icon.svg" alt="" /></li></Link>
        <Link href="/tags"><li><img src="/images/tag-icon.svg" alt="" /></li></Link>
        <Link href="/settings"><li><img src="/images/setting-icon.svg" alt="" /></li></Link>
      </ul>
    </nav>
  )
}