import { useLatest } from "../../hooks/useCurrencyData"
import styles from "./DropDown.module.css"

type DropDownButton = {
  identifier: 'dropdown-first' | 'dropdown-second',
  isOpened: boolean;
}

export const DropDownButtons = (props: DropDownButton) => {
  const defaultCurrencies = [
    // { name: "Российский рубль", code: "RUB" },
    { name: "Доллар США", code: "USD" },
    { name: "Евро", code: "EUR" },
    { name: "Белорусский рубль", code: "BYN" },
    { name: "Датская крона", code: "DKK" },
    { name: "Индийская рупия", code: "INR" },
    { name: "Китайский юань", code: "CNY" },
    { name: "Норвежская крона", code: "NOK" },
    { name: "Польский злотый", code: "PLN" },
    { name: "Турецкая лира", code: "TRY" },
    { name: "Украинская гривна", code: "UAH" },
    { name: "Шведская крона", code: "SEK" },
    { name: "Швейцарский франк", code: "CHF" }
  ];

  const symbols = defaultCurrencies.map(cur => cur.code);
  const { data, isError, isLoading } = useLatest('USD', symbols);

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  // if (isError) {
  //   return <div>Try again later server is not responded</div>
  // }

  return (
    <div
      className={styles['dropdown-buttons']}
      id={props.identifier}
      style={props.isOpened ? { display: "flex" } : { display: "none" }}>
      {data && Object.keys(data.rates)
        .map((el, ind) => {
          return (
            <button
              className={styles['dropdown-button']}
              key={ind}>
              <span className={styles['currency-name']}>
                {defaultCurrencies[ind]?.name}
              </span>
              <span className={styles['currency-code']}>
                {defaultCurrencies[ind]?.code}
              </span>
            </button>
          )
        }
        )}
    </div >
  )
}