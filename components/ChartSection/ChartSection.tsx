import { Chart } from 'react-chartjs-2';
import { Chart as ChartClass, plugins, registerables } from 'chart.js';
import { CurrencyTimeSeries, useTimeSeries } from '../../hooks/useCurrencyData';
import classNames from 'classnames';
import styles from './ChartSection.module.css'
import { useState } from 'react';

const api_key = "TvtPaidBzROSQKlLafq6OggeQ1QlnJyl";
const base = "https://api.currencybeacon.com/v1";

ChartClass.register(...registerables);

export default function ChartSection() {

  const duration = ['день', 'неделя', 'квартал', 'год'];
  const [selectedDuration, setSelectedDuration] = useState(0);

  const handleActive = (ind) => {
    setSelectedDuration(ind);
  }


  let endDate;

  switch (selectedDuration) {
    case 0: // day
      endDate = (new Date(new Date().setDate(new Date()!.getDate() - 7)).toISOString().split('T')[0]);
      break;
    case 1: // week
      endDate = (new Date(new Date().setDate(new Date().getDate() - 31)).toISOString().split('T')[0]);
      break;
    case 2: // month
      endDate = (new Date(new Date().setDate(new Date().getDate() - 150)).toISOString().split('T')[0]);
      break;
    case 3: // year
      endDate = (new Date(new Date().setDate(new Date().getDate() - 150)).toISOString().split('T')[0]);
      break;
    default:
      endDate = new Date().toISOString().split('T')[0];
  }

  const baseCurrency = 'USD';
  const additionalCurrency = 'EUR';
  const additionalCurrency2 = 'CNY';
  const symbols = ['RUB',]; //'EUR', 'GBP', 'CNY'

  const { data, isLoading, isError } =
    useTimeSeries(baseCurrency, endDate, new Date().toISOString().split('T')[0], symbols, new Date().toString());

  const { data: data2, isLoading: isLoading2, isError: isError2 } =
    useTimeSeries(additionalCurrency, endDate, new Date().toISOString().split('T')[0], symbols, symbols[0] + new Date().toString());

  const { data: data3, isLoading: isLoading3, isError: isError3 } =
    useTimeSeries(additionalCurrency2, endDate, new Date().toISOString().split('T')[0], symbols, new Date().toString());


  const prepareData = (rawData: CurrencyTimeSeries) => {
    const dates = Array.from(Object.keys(rawData.response)).map(el => el.slice(5).split('-').reverse().join("."));
    return dates
  }

  const prepareValue = (rawData: CurrencyTimeSeries) => {
    const values = Object.values(rawData.response).map(obj => Object.values(obj)[0]);
    return values;
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
      {duration.map((el, i) =>
        <button className={classNames(styles['calc__button'], selectedDuration === i ? styles.active : null)}
          key={i}
          onClick={() => handleActive(i)}>
          {el}
        </button>)}
      {data && !isLoading && !isError ?
        <div className="diagram-field">
          <Chart
            className='diagram'

            type='line'
            data={{
              labels: prepareData(data),
              datasets: [{
                label: `currency of ${symbols[0]}`,
                data: prepareValue(data),
                borderWidth: 1,
              }]
              ,
            }}
            options={
              {
                plugins: {
                  legend: {
                    labels: {
                      font: {
                        size: 28
                      }
                    }
                  }
                },
                responsive: true,
                locale: 'ru-RU',
                scales: {
                  x: {
                    ticks: {
                      font: {
                        size: 20
                      }
                    },
                    grid: {
                      color: '#26278D',
                    }
                  },
                  y: {
                    ticks: {
                      font: {
                        size: 20
                      }
                    },
                    beginAtZero: true,
                  }
                }
                // , plugins: {
                //   decimation: {
                //     enabled: true,
                //     algorithm: 'min-max',
                //   }
                // }
              }
            }
          />
          <div className="sub-diagram-field">
            {data2 ? <Chart
              className='diagram sub-diagram'
              type='line'
              data={{
                labels: prepareData(data2),
                datasets: [{
                  label: `currency of ${symbols[0]}`,
                  data: prepareValue(data2),
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
            /> : []}
            {data3 ? <Chart
              className='diagram sub-diagram'
              type='line'
              data={{
                labels: prepareData(data3),
                datasets: [{
                  label: `currency of ${symbols[0]}`,
                  data: prepareValue(data3),
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
            /> : []}

          </div>
        </div>
        : []
      }
    </section>
  )
}
