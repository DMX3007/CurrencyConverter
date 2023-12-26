import Image from "next/image"
import styles from "./Header.module.css"
import logo from '../../public/logo.svg'
let classNames = require('classnames');

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <div className={styles.header__logo}>
            <Image
              className={styles.header__logo__image}
              alt="Логотип"
              src={logo}
            />
            <h2 className={styles.header__logo__title}>KonVal</h2>
          </div>
          <label className={classNames(styles.language__switch_button)} >
            <input className={classNames(styles.checkbox, styles.visually_hidden)}
              type="checkbox" />
            <span className={classNames(styles.check_button, styles.isChecked)}>ru
            </span>
            <span className={classNames(styles.check_button)}>eng</span>
          </label>
        </nav >
        <h1 className={styles.header__title}>Конвертер валют</h1>
      </header >

    </>
  )
}
