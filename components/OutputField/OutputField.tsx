import { useState } from 'react';
import styles from './OutputField.module.css'

export default function OutputField({ currency, rate }: { currency: string, rate: number }) {
  const [res, setRes] = useState(0);
  const calc = () => {
    setRes(inputValue * rate);
  };

  return (
    <div className={styles.input}>
      <div className={styles.input_wbr}>
        <p className={styles.result_par}>{res}</p>
        <img className={styles.country_flag} src="" alt="" />
      </div>
      <p className={styles.valute_value}>1 USD = {rate} RUB</p>
    </div>
  )
}
