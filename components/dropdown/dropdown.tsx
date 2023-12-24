import { useLatest } from "../../hooks/useCurrencyData"
import styles from "./DropDown.module.css"

type DropDownButton = {
  identifier: 'dropdown-first' | 'dropdown-second',
  isOpened: boolean;
  changeCurrency: (value: string, ind: number) => void;
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
  const { data, isError, isLoading } = useLatest('USD', symbols, 'dropdown');

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
              onClick={() => props.changeCurrency(el, ind)}
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

// "rates": { "ADA""AED""AFN""ALL""AMD""ANG""AOA""ARS""ATS""AUD""AWG""AZM""AZN""BAM""BBD""BCH""BDT""BEF""BGN""BHD""BIF""BMD""BND""BOB""BRL""BSD""BTC""BTN""BWP""BYN""BYR""BZD""CAD""CDF""CHF""CLF""CLP""CNH""CNY""COP""CRC""CUC""CUP""CVE""CYP""CZK""DEM""DJF""DKK""DOGE""DOP""DOT""DZD""EEK""EGP""ERN""ESP""ETB""ETH""EUR""FIM""FJD""FKP""FRF""GBP""GEL""GGP""GHC""GHS""GIP""GMD""GNF""GRD""GTQ""GYD""HKD""HNL""HRK""HTG""HUF""IDR""IEP""ILS""IMP""INR""IQD""IRR""ISK""ITL""JEP""JMD""JOD""JPY""KES""KGS""KHR""KMF""KPW""KRW""KWD""KYD""KZT""LAK""LBP""LINK""LKR""LRD""LSL""LTC""LTL""LUF""LUNA""LVL""LYD""MAD""MDL""MGA""MGF""MKD""MMK""MNT""MOP""MRO""MRU""MTL""MUR""MVR""MWK""MXN""MXV""MYR""MZM""MZN""NAD""NGN""NIO""NLG""NOK""NPR""NZD""OMR""PAB""PEN""PGK""PHP""PKR""PLN""PTE""PYG""QAR""ROL""RON""RSD""RUB""RWF""SAR""SBD""SCR""SDD""SDG""SEK""SGD""SHP""SIT""SKK""SLE""SLL""SOS""SPL""SRD""SRG""STD""STN""SVC""SYP""SZL""THB""TJS""TMM""TMT""TND""TOP""TRL""TRY""TTD""TVD""TWD""TZS""UAH""UGX""UNI""USD""UYU""UZS""VAL""VEB""VED""VEF""VES""VND""VUV""WST""XAF""XAG""XAU""XBT""XCD""XDR""XLM""XOF""XPD""XPF""XPT""XRP""YER""ZAR""ZMK""ZMW""ZWD""ZWL" }