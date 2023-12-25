import { Chart } from 'react-chartjs-2';
import { Chart as ChartClass, plugins, registerables } from 'chart.js';
import { CurrencyTimeSeries, useTimeSeries } from '../../hooks/useCurrencyData';
import classNames from 'classnames';
import styles from './ChartSection.module.css'
import { useState } from 'react';

ChartClass.register(...registerables);

interface ChartSectionI {
  baseCurrency: string,
  alternativeCurrency: string,
  alternativeCurrency2: string,
  symbols: [string]
}

export default function ChartSection({ baseCurrency, alternativeCurrency, alternativeCurrency2, symbols }: ChartSectionI) {
  console.log(baseCurrency)
  const duration = ['неделя', 'месяц', 'квартал', 'год'];
  const [selectedDuration, setSelectedDuration] = useState(0);

  const handleActive = (ind: number) => {
    setSelectedDuration(ind);
  }

  let endDate;

  switch (selectedDuration) {
    case 0: // week
      endDate = (new Date(new Date().setDate(new Date()!.getDate() - 7)).toISOString().split('T')[0]);
      break;
    case 1: // month
      endDate = (new Date(new Date().setDate(new Date().getDate() - 31)).toISOString().split('T')[0]);
      break;
    case 2: // quart
      endDate = (new Date(new Date().setDate(new Date().getDate() - 150)).toISOString().split('T')[0]);
      break;
    case 3: // year
      endDate = (new Date(new Date().setDate(new Date().getDate() - 150)).toISOString().split('T')[0]);
      break;
    default:
      endDate = new Date().toISOString().split('T')[0];
  }

  const { data, isLoading, isError } =
    useTimeSeries(baseCurrency, endDate, new Date().toISOString().split('T')[0], symbols, baseCurrency + selectedDuration);

  const { data: data2, isLoading: isLoading2, isError: isError2 } =
    useTimeSeries(alternativeCurrency, endDate, new Date().toISOString().split('T')[0], symbols, alternativeCurrency + selectedDuration);

  const { data: data3, isLoading: isLoading3, isError: isError3 } =
    useTimeSeries(alternativeCurrency2, endDate, new Date().toISOString().split('T')[0], symbols, alternativeCurrency2 + selectedDuration);

  const prepareData = (rawData: CurrencyTimeSeries) => {
    const dates = Array.from(Object.keys(rawData.response)).map(el => el.slice(5).split('-').reverse().join("."));
    return dates
  }

  const prepareValue = (rawData: CurrencyTimeSeries) => {
    const values = Object.values(rawData.response).map(obj => Object.values(obj)[0]);
    return values
  }

  if (isLoading) {
    return <div>Data is loading</div>
  }

  if (isError) {
    return <div>Try again</div>
  }

  const config = {
    labels: prepareData(data!),
    datasets: [{
      label: `${baseCurrency}`,
      data: prepareValue(data!),
      borderWidth: 3,
      backgroundColor: '#26278D',
      borderColor: '#26278D',
      pointRadius: 0,
    }]
    ,
  }

  const options = {
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
      },
      y: {
        min: Math.min(...prepareValue(data!)) - 5,
        max: Math.max(...prepareValue(data!)) + 5,

        ticks: {
          font: {
            size: 20
          }
        },
        beginAtZero: true,
      }
    }
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
            style={{ borderRadius: '10px' }}
            type='line'
            data={config}
            options={options}
          />
          <div className="sub-diagram-field">
            {data2 ? <Chart
              className='diagram sub-diagram'
              type='line'
              style={{ borderRadius: '10px' }}

              data={{
                labels: prepareData(data2),
                datasets: [{
                  label: `${alternativeCurrency}`,
                  data: prepareValue(data2),
                  borderWidth: 3,
                  backgroundColor: '#26278D',
                  borderColor: '#26278D',
                  pointRadius: 0,
                }]
                ,
              }}
              options={{
                scales: {
                  y: {
                    min: Math.min(...prepareValue(data2!)) - 5,
                    max: Math.max(...prepareValue(data2!)) + 5,
                    beginAtZero: true,
                  }
                }
              }
              }
            /> : []}
            {data3 ? <Chart
              className='diagram sub-diagram'
              type='line'
              style={{ borderRadius: '10px' }}

              data={{
                labels: prepareData(data3),
                datasets: [{
                  label: `${alternativeCurrency2}`,
                  data: prepareValue(data3),
                  borderWidth: 3,
                  backgroundColor: '#26278D',
                  borderColor: '#26278D',
                  pointRadius: 0,
                }]
                ,
              }}
              options={{
                scales: {
                  y: {
                    min: Math.min(...prepareValue(data3!)) - 5,
                    max: Math.max(...prepareValue(data3!)) + 5,
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
