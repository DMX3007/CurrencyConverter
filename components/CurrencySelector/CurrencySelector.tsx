import Image from "next/image"
import { DropDownButtons } from "../dropdown/dropdown"
import styles from './CurrencySelector.module.css';
import classNames from "classnames";
import { Dispatch, SetStateAction, useState } from "react";
import CurrencyButton from "../CurrencyButton/CurrencyButton";
import convert from '../../public/converter.svg'
import InputField from "../InputField/InputField";
import ArrowSvg from "../../svg/ArrowSvg";
import OutputField from "../OutputField/OutputField";
import { useLatest } from '../../hooks/useCurrencyData';
import { useBind } from "../InputField/InputBind";

export default function CurrencySelector() {

  const [currencies, setCurrencies] = useState(['RUB', 'USD', 'EUR', 'GBP', 'CNY']);

  const [currencyFrom, setCurrencyFrom] = useState(currencies[0]);
  const [currencyTo, setCurrencyTo] = useState(currencies[1]);

  const inputValue = useBind('1');

  const [isActiveFrom, setIsActiveFrom] = useState<number>(0);
  const [isActiveTo, setIsActiveTo] = useState<number>(1);
  const [isOpenedFrom, setIsOpenedFrom] = useState(false);
  const [isOpenedTo, setIsOpenedTo] = useState(false);

  const dropDownCurrencyChangeHandler = (value: string, ind: number) => {
    setCurrencies(currencies.toSpliced(ind, 1, value));
  }

  const clickHandler = (index: number, cb: Dispatch<SetStateAction<number>>, cbCur: Dispatch<SetStateAction<string>>) => {
    cb(index);
    cbCur(currencies[index]);
  }

  const handleOpened = (cb: Dispatch<SetStateAction<boolean>>) => {
    cb(current => !current)
  }

  const { data, isLoading, isError } = useLatest(currencyFrom, currencies, currencyFrom);

  if (isLoading) {
    return <div>Data is loading</div>
  }

  if (isError) {
    return <div>Try again</div>
  }
  return (
    <>
      <h2 className={styles['sub-title']}>Онлайн конвертация валют</h2>
      <section className={styles.calc__switcher}>
        <div className={styles.calc__group}>
          <article className={styles.calc__article}>
            {currencies.map((cur, ind) => (<CurrencyButton
              key={cur}
              active={isActiveFrom === ind}
              content={cur}
              onClick={() => clickHandler(ind, setIsActiveFrom, setCurrencyFrom)} />
            ))}
            <button
              type="button"
              className={isOpenedFrom ?
                classNames(styles.arrow, styles.active)
                : styles.arrow
              }
              style={isOpenedFrom ? { fill: 'white' } : { fill: 'black' }}
              onClick={() => handleOpened(setIsOpenedFrom)}
            >
              <ArrowSvg color={isOpenedFrom ? 'white' : 'black'} />
            </button>
            <DropDownButtons changeCurrency={dropDownCurrencyChangeHandler} identifier={'dropdown-first'} isOpened={isOpenedFrom} />
          </article>
          <InputField
            inputValue={inputValue}
            currencyFrom={currencyFrom}
            currencyTo={currencyTo}
            rate={data! && data?.rates[currencyTo]} />
        </div>

        <button className={styles['card-section__converter-button']}>
          <Image
            className={styles["card-section__img"]}
            src={convert}
            alt="конвертация"
          />
        </button>
        <div className={styles.calc__group}>
          <article className={styles.calc__article}>
            {currencies.map((cur, ind) =>
            (<CurrencyButton
              key={cur}
              active={isActiveTo === ind}
              content={cur}
              onClick={() => clickHandler(ind, setIsActiveTo, setCurrencyTo)} />
            ))}
            <button
              type="button"
              className={isOpenedTo ?
                classNames(styles.arrow, styles.active) :
                styles.arrow
              }
              onClick={() => handleOpened(setIsOpenedTo)}
            >
              <ArrowSvg color={isOpenedTo ? 'white' : 'black'} />
            </button>
            <DropDownButtons changeCurrency={dropDownCurrencyChangeHandler} identifier={'dropdown-second'} isOpened={isOpenedTo} />
          </article>
          <OutputField
            value={inputValue}
            currencyFrom={currencyFrom}
            currencyTo={currencyTo}
            rate={data! && data.rates[currencyTo]} />
        </div>
      </section >
    </>
  )
}
