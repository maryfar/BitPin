import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTrades = async (marketId: string) => {
  const { data } = await axios.get(`https://api.bitpin.org/v1/mth/matches/${marketId}/`);
  return data;
};

export const useTrades = (marketId: string) => {
  return useQuery({
    queryKey: ["trades", marketId],
    queryFn: () => fetchTrades(marketId),
    enabled: !!marketId,
  });
};
