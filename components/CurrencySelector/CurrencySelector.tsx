import Image from "next/image"
import { DropDownButtons } from "../dropdown/dropdown"
import styles from './CurrencySelector.module.css';
import classNames from "classnames";
import { Dispatch, SetStateAction, useState } from "react";
import CurrencyButton from "../CurrencyButton/CurrencyButton";
import arrow from '../../public/arrow.svg'
import convert from '../../public/converter.svg'

export default function CurrencySelector() {

  const currencies = ['RUB', 'USD', 'EUR', 'GBR', 'CNY'];

  const [isActiveLeft, setIsActiveLeft] = useState<number>(0);
  const [isActiveRight, setIsActiveRight] = useState<number>(1);
  const [isOpened, setIsOpened] = useState(false);
  const [isOpenedRight, setIsOpenedRight] = useState(false);

  const clickHandler = (index: number, cb: Dispatch<SetStateAction<number>>) => {
    cb(index);
  }

  const handleOpened = (cb: Dispatch<SetStateAction<boolean>>) => {
    cb(current => !current)
  }

  return (
    <>
      <h2 className={styles['sub-title']}>Онлайн конвертация валют</h2>
      <section className={styles.calc__switcher}>
        <article className={styles.calc__article}>
          {currencies.map((cur, ind) => (<CurrencyButton
            key={cur}
            active={isActiveLeft === ind}
            content={cur}
            onClick={() => clickHandler(ind, setIsActiveLeft)} />
          ))}
          <button
            type="button"
            className={isOpened ?
              classNames(styles.arrow, styles.active)
              : styles.arrow
            }
            onClick={() => handleOpened(setIsOpened)}
          >
            <Image src={arrow} alt="arrow" objectFit="true" />
          </button>
          <DropDownButtons identifier={'dropdown-first'} isOpened={isOpened} />
        </article>

        <button className={styles['card-section__converter-button']}>
          <Image
            className={styles["card-section__img"]}
            src={convert}
            alt="конвертация"
            width={32}
            height={32}
          />
        </button>
        <article className={styles.calc__article}>
          {currencies.map((cur, ind) =>
          (<CurrencyButton
            key={cur}
            active={isActiveRight === ind}
            content={cur}
            onClick={() => clickHandler(ind, setIsActiveRight)} />
          ))}
          <button
            type="button"
            className={isOpenedRight ?
              classNames(styles.arrow, styles.active) :
              styles.arrow
            }
            onClick={() => handleOpened(setIsOpenedRight)}
          >
            <Image src={arrow} alt="arrow" objectFit="true" />
          </button>
          <DropDownButtons identifier={'dropdown-second'} isOpened={isOpenedRight} />
        </article>
      </section >
    </>
  )
}
