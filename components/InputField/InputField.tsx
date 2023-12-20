import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import styles from './InputField.module.css';

const InputField = ({ currency, rate }: { currency: string, rate: number }) => {
  const [inputValue, setInputValue] = useState(0);
  const rub = 1;

  // const textInputRef = useRef(null);

  const setValue = (text) => {
    setInputValue(text);
  };

  return (
    <div className={styles.input}>
      <div className={styles.input_wbr}>
        <textarea
          id="textInput"
          value={inputValue}
          onChange={(e) => setValue(e.target.value)}
          // ref={textInputRef}
          className={classNames(styles.input_push, styles.colorBlue)}
          type="number"
          placeholder="1"
        />
        <img className={styles.country_flag} src="" alt="" />
      </div>
      <p className={styles.valute_value}>
        {rub} RUB = {Math.round((rub / rate) * 10000) / 10000} {currency}
      </p>
    </div>
  );
};

export default InputField;