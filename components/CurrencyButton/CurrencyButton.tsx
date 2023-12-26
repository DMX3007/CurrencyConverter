import React from 'react'
import styles from './CurrencyButton.module.css'
import classNames from 'classnames';

interface CurrencyButton {
  active: boolean;
  content: string;
  onClick: () => void;
}

export default function CurrencyButton({ active, content, onClick }: CurrencyButton) {
  return (
    <button
      type="button"
      onClick={() => onClick()}
      className={active ? classNames(styles.calc__button, styles.active) : styles.calc__button}>
      <span
        className="text">{content}
      </span>
    </button>
  )
}
