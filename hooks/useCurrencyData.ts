import axios from "axios";
import { useQuery } from "react-query";

export type CurrencyList = CurrencyItem[];

export type CurrencyItem = {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: string;
  thousands_separator: string;
};

export type CurrencyLatestResponse = Omit<CurrencyLatest, "response">;

export type CurrencyLatest = {
  response: CurrencyLatestResponse; // CurrencyLates
  date: Date;
  base: string;
  rates: { [key: string]: number };
};
export interface CurrencyTimeSeries {
  response: { [key: string]: { [key: string]: number } };
}
export type CurrencyConvert = {
  response?: {
    timestamp: number;
    date: Date;
    from: string;
    to: string;
    amount: number;
    value: number;
  };
  timestamp: number;
  date: Date;
  from: string;
  to: string;
  amount: number;
  value: number;
};

const API_BASE_URL = "https://api.currencybeacon.com/v1";
const baseApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const getLatestRates = async (base: string, symbols: string[]) => {
  const url = `${API_BASE_URL}/latest?base=${base}&symbols=${symbols.join(
    ","
  )}&api_key=TvtPaidBzROSQKlLafq6OggeQ1QlnJyl`;
  console.log(url);
  const response = await baseApi.get<CurrencyLatest>(url);
  return response.data;
};

const getCurrencyList = async () => {
  const url = `${API_BASE_URL}/currencies/?api_key=TvtPaidBzROSQKlLafq6OggeQ1QlnJyl&type=fiat`;
  const response = await baseApi.get<CurrencyList>(url, {
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return response.data;
};

const getHistoricalRates = async (
  base: string,
  date: string,
  symbols: string[]
) => {
  const url = `${API_BASE_URL}/historical?base=${base}&date=${date}&symbols=${symbols.join(
    ","
  )}&api_key=TvtPaidBzROSQKlLafq6OggeQ1QlnJyl`;
  const response = await baseApi.get<CurrencyLatest>(url);
  return response.data;
};

const getTimeSeriesRates = async (
  base: string,
  start_date: string,
  end_date: string,
  symbols: string[]
) => {
  const url = `${API_BASE_URL}/timeseries?&base=${base}&start_date=${start_date}&end_date=${end_date}&symbols=${symbols.join(
    ","
  )}&api_key=TvtPaidBzROSQKlLafq6OggeQ1QlnJyl`;
  const response = await baseApi.get<CurrencyTimeSeries>(url);
  return response.data;
};

export const useTimeSeries = (
  base = "RUB",
  start_date: string,
  end_date: string,
  symbols = ["USD"],
  key: string
) => {
  return useQuery<CurrencyTimeSeries>({
    queryKey: [key],
    queryFn: () => getTimeSeriesRates(base, start_date, end_date, symbols),
  });
};

export const useHistorical = (
  base = "RUB",
  date: string,
  symbols = ["USD"]
) => {
  return useQuery<CurrencyLatest>({
    queryKey: ["historical"],
    queryFn: () => getHistoricalRates(base, date, symbols),
  });
};

export const useCurrencyList = () => {
  return useQuery<CurrencyList>({
    queryKey: ["list"],
    queryFn: () => getCurrencyList(),
  });
};

export const useLatest = (base, symbols, key) => {
  return useQuery<CurrencyLatest>({
    queryKey: [key],
    queryFn: () => getLatestRates(base, symbols),
  });
};
