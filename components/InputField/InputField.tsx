import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import styles from './InputField.module.css';
import { Binder, InputBind } from './InputBind';

const InputField = ({ currencyTo, currencyFrom, rate, inputValue }:
  { currencyTo: string, currencyFrom: string, rate: number, inputValue: Binder }) => {
  const MINIMAL = 1;

  return (
    <div className={styles.input}>
      <div className={styles.input_wbr}>
        <InputBind value={inputValue} />
        <img className={styles.country_flag} src="" alt="" />
      </div>
      <p className={styles.valute_value}>
        {MINIMAL} {currencyFrom} = {(Math.round((MINIMAL / rate) * 10000) / 10000).toFixed(2)} {currencyTo}
      </p>
    </div>
  );
};

export default InputField;