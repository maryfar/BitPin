import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchOrders = async (marketId: string, type: "buy" | "sell") => {
  const { data } = await axios.get(`https://api.bitpin.org/v2/mth/actives/${marketId}/?type=${type}`);
  return data;
};

export const useOrders = (marketId: string, type: "buy" | "sell") => {
  return useQuery({
    queryKey: [type === "buy" ? "buyOrders" : "sellOrders", marketId],
    queryFn: () => fetchOrders(marketId, type),
    enabled: !!marketId,
  });
};