import { useState } from 'react';
import styles from './OutputField.module.css'
import { Binder } from '../InputField/InputBind';

export default function OutputField({ currencyFrom, currencyTo, rate, value }:
  { currencyFrom: string, currencyTo: string, rate: number, value: Binder }) {
  return (
    <div className={styles.input}>
      <div className={styles.input_wbr}>
        <p className={styles.result_par}>{Number(+value.value * rate)?.toFixed(2)}</p>
        <img className={styles.country_flag} src="" alt="" />
      </div>
      <p className={styles.valute_value}>1 {currencyFrom} = {rate?.toFixed(2)} {currencyTo} </p>
    </div>
  )
}
