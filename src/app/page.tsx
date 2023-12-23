'use client'
import Header from '../../components/header/header';
import CurrencySelector from '../../components/CurrencySelector/CurrencySelector';
import ChartSection from '../../components/ChartSection/ChartSection';

export default function Home() {

  return (
    <main>
      <Header />
      <CurrencySelector />

      <ChartSection />

    </main>
  )
}
