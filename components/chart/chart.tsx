import { Chart } from 'react-chartjs-2';
import { Chart as ChartClass, registerables } from 'chart.js';
import { useTimeSeries } from '../../hooks/useCurrencyData';

const api_key = "TvtPaidBzROSQKlLafq6OggeQ1QlnJyl";
const base = "https://api.currencybeacon.com/v1";

ChartClass.register(...registerables);

export default function ChartSection() {

  const baseCurrency = 'USD';
  const symbols = ['RUB',]; //'EUR', 'GBP', 'CNY'
  const startDate = '2023-11-01';

  const endDate = new Date();
  const cookedEndDate = new Date().toISOString().split('T')[0]  // {YYYY-MM-DD};
  const week = (new Date(new Date().setDate(endDate.getDate() - 7)).toISOString().split('T')[0]);
  const month = (new Date(new Date().setDate(endDate.getDate() - 31)).toISOString().split('T')[0]);
  const year = (new Date(new Date().setDate(endDate.getDate() - 200)).toISOString().split('T')[0]);


  const { data, isLoading, isError } = useTimeSeries(baseCurrency, startDate, cookedEndDate, symbols);

  let dates = [];
  let values = [];

  if (data) {
    dates = Array.from(Object.keys(data.response))
    values = Object.values(data.response).map(obj => Object.values(obj)[0]);

    console.log(dates)
    console.log(values)
  }

  if (isLoading) {
    return <div>Data is loading</div>
  }

  if (isError) {
    return <div>Try again</div>
  }

  return (
    <section className="diagram-section">
      <h2 className="sub-title">Динамика курса</h2>
      {data && !isLoading && !isError ?
        <div className="diagram">
          <Chart
            type='line'
            data={{
              labels: dates,
              datasets: [{
                label: `currency of ${symbols[0]}`,
                data: values,
                borderWidth: 1
              }]
              ,
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                }
              }
            }
            }
          />
        </div> : []
      }
    </section>
  )
}
