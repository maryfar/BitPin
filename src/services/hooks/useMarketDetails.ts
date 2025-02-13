import { useMemo } from "react";
import { Market } from "./useFetchMarkets";

// interface IuseMarketDetailsParams {
//     id: string;
//     markets: Market[];
//   }


export const useMarketDetails = ( id: string, markets:Market[] ) => {
  return useMemo(() => {
    return markets?.find((market) => market.id === Number(id)) || null;
  }, [id, markets]);
};
