import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export interface Market {
  id: number;
  title: string;
  code: string;
  currency1: {
    code: string;
    title_fa: string;
    title: string;
    image: string;
  };
  currency2: {
    code: string;
    title: string;
    tags: [
        {
        id: number,
        name:string,
        name_en: string,
        has_chart: boolean
        },
    ]
  };
  price_info: {
    min: string;
    max: string;
    price: string;
    change: number;
  }
}

const fetchMarkets = async (): Promise<Market[]> => {
  const { data } = await axios.get("https://api.bitpin.ir/v1/mkt/markets/");
  return data.results;
};


export const useFetchMarkets = () => {
  return useQuery<Market[]>({
    queryKey: ["markets"], 
    queryFn: fetchMarkets,
  });
};
