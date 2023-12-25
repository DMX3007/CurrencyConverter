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

interface CurrencySelectorI {
  currencies: string[],
  currencySelector: (value: string, ind: number) => void,
  from: string,
  to: string,
  fromChanger: Dispatch<SetStateAction<string>>,
  toChanger: Dispatch<SetStateAction<string>>,
}

export default function CurrencySelector({ currencies,
  currencySelector,
  from,
  to,
  fromChanger,
  toChanger }: CurrencySelectorI) {


  const inputValue = useBind('1');

  const [isActiveFrom, setIsActiveFrom] = useState<number>(0);
  const [isActiveTo, setIsActiveTo] = useState<number>(1);
  const [isOpenedFrom, setIsOpenedFrom] = useState(false);
  const [isOpenedTo, setIsOpenedTo] = useState(false);

  const clickHandler = (index: number, cb: Dispatch<SetStateAction<number>>, cbCur: Dispatch<SetStateAction<string>>) => {
    console.log('hi')
    cb(index);
    cbCur(currencies[index]);
  }

  const handleOpened = (cb: Dispatch<SetStateAction<boolean>>) => {
    cb(current => !current)
  }

  const { data, isLoading, isError } = useLatest(from, currencies, from);

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
              onClick={() => clickHandler(ind, setIsActiveFrom, fromChanger)} />
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
            <DropDownButtons changeCurrency={currencySelector} identifier={'dropdown-first'} isOpened={isOpenedFrom} />
          </article>
          <InputField
            inputValue={inputValue}
            currencyFrom={from}
            currencyTo={to}
            rate={data! && data?.rates[to]} />
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
              onClick={() => clickHandler(ind, setIsActiveTo, toChanger)} />
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
            <DropDownButtons changeCurrency={currencySelector} identifier={'dropdown-second'} isOpened={isOpenedTo} />
          </article>
          <OutputField
            value={inputValue}
            currencyFrom={from}
            currencyTo={to}
            rate={data! && data.rates[to]} />
        </div>
      </section >
    </>
  )
}
