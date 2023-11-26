import { useQuery } from "react-query";
import axios from "axios";

interface CurrencyData {
  // Define the properties of the currency data here
}

const API_BASE_URL = "https://api.currencybeacon.com/v1";

const getLatestRates = async (
  base: string,
  symbols: string[]
): Promise<CurrencyData> => {
  const url = `${API_BASE_URL}/latest?base=${base}&symbols=${symbols.join(
    ","
  )}&api_key=TvtPaidBzROSQKlLafq6OggeQ1QlnJyl`;
  const response = await axios.get(url);
  return response.data;
};

const getHistoricalRates = async (
  base: string,
  date: string,
  symbols: string[]
): Promise<CurrencyData> => {
  const url = `${API_BASE_URL}/historical?base=${base}&date=${date}&symbols=${symbols.join(
    ","
  )}&api_key=TvtPaidBzROSQKlLafq6OggeQ1QlnJyl`;
  const response = await axios.get(url);
  return response.data;
};

const getTimeSeriesRates = async (
  base: string,
  start_date: string,
  end_date: string,
  symbols: string[]
): Promise<CurrencyData> => {
  const url = `${API_BASE_URL}/timeseries?&base=${base}&start_date=${start_date}&end_date=${end_date}&symbols=${symbols.join(
    ","
  )}&api_key=TvtPaidBzROSQKlLafq6OggeQ1QlnJyl`;
  const response = await axios.get(url);
  return response.data;
};

const useCurrencyData = (
  base: string,
  symbols: string[],
  date?: string,
  start_date?: string,
  end_date?: string
) => {
  return useQuery<CurrencyData>({
    queryKey: ["currency", base, symbols, date, start_date, end_date],
    queryFn: () => {
      if (end_date && start_date) {
        return getTimeSeriesRates(base, start_date, end_date, symbols);
      } else if (date) {
        return getHistoricalRates(base, date, symbols);
      } else {
        return getLatestRates(base, symbols);
      }
    },
  });
};

export default useCurrencyData;
