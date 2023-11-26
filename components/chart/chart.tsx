import { Chart } from 'react-chartjs-2';
import { Chart as ChartClass, registerables } from 'chart.js';
import useCurrencyData from '../../hooks/useCurrencyData';

const api_key = "TvtPaidBzROSQKlLafq6OggeQ1QlnJyl";
const base = "https://api.currencybeacon.com/v1";

ChartClass.register(...registerables);

export default function ChartSection() {

  const baseCurrency = 'RUB';
  const symbols = ['USD',]; //'EUR', 'GBP', 'CNY'
  const startDate = '2021-01-01';

  const endDate = new Date();
  const cookedEndDate = new Date().toISOString().split('T')[0]  // {YYYY-MM-DD};
  const week = (new Date(new Date().setDate(endDate.getDate() - 7)).toISOString().split('T')[0]);
  const month = (new Date(new Date().setDate(endDate.getDate() - 31)));
  const year = (new Date(new Date().setDate(endDate.getDate() - 365)));


  const { data, isLoading, isError } = useCurrencyData(baseCurrency, symbols, undefined, week, cookedEndDate);


  let dates = [];
  let values = [];

  if (data) {
    dates = Array.from(Object.keys(data.response))
    values = Object.values(data.response).map(obj => Object.values(obj)[0]);
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
                label: '# of Votes',
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
