'use client'
import Header from '../../components/header/header';
import CurrencySelector from '../../components/CurrencySelector/CurrencySelector';
import ChartSection from '../../components/ChartSection/ChartSection';
import { Dispatch, SetStateAction, useState } from 'react';

export default function Home() {

  const [currencies, setCurrencies] = useState(['RUB', 'USD', 'EUR', 'GBP', 'CNY']);
  const [currencyFrom, setCurrencyFrom] = useState(currencies[0]);
  const [currencyTo, setCurrencyTo] = useState(currencies[1]);

  const dropDownCurrencyChangeHandler = (value: string, ind: number) => {
    setCurrencies(currencies.toSpliced(ind, 1, value));
  }

  const fromChanger: Dispatch<SetStateAction<string>> = (value) => {
    setCurrencyFrom(value)
  }
  const toChanger: Dispatch<SetStateAction<string>> = (value) => {
    setCurrencyTo(value)
  }


  return (
    <main>
      <Header />
      <CurrencySelector
        currencies={currencies}
        currencySelector={dropDownCurrencyChangeHandler}
        from={currencyFrom}
        to={currencyTo}
        fromChanger={fromChanger}
        toChanger={toChanger} />
      <ChartSection baseCurrency={currencyTo}
        alternativeCurrency={currencies[1]} alternativeCurrency2={currencies[2]} symbols={[currencyFrom]} />
    </main>
  )
}
