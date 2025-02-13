import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useMarketDetails } from "../services/hooks/useMarketDetails";
import { useOrders } from "../services/hooks/useOrders";
import { useTrades } from "../services/hooks/ useTrades";
import { Market } from "../services/hooks/useFetchMarkets";
import OrderTable from "../components/OrderTable";
import { CustomTabs } from "../components/CustomTabs";
import { PersianDigit } from "../services/utils/PersionDigit";
import { useNavigate } from "react-router-dom";
import Decimal from "decimal.js";
import { useSwipe } from "../services/hooks/useswipe";

interface IMarketDetailsParams {
  id: string;
  markets: Market[];
}

interface IOrder {
  id: string;
  remain: number;
  price: number;
  value: number;
  amount: number;
  match_amount?: number;
  type?: "sell" | "buy";
}

const MarketDetails = ({ id, markets }: IMarketDetailsParams) => {
  const [activeTab, setActiveTab] = useState(0);
  const [percentage, setPercentage] = useState(50);
  const [buyOrders, setBuyOrders] = useState<IOrder[]>([]);
  const [sellOrders, setSellOrders] = useState<IOrder[]>([]);
  const [tradesOrders, setTradesData] = useState<IOrder[]>([]);
  const market = useMarketDetails(id, markets);

  const { data: buyData, refetch: refetchBuy } = useOrders(id, "buy");
  const { data: sellData, refetch: refetchSell } = useOrders(id, "sell");
  const { data: tradesData } = useTrades(id);

  useSwipe(
    () => setActiveTab((prev) => Math.min(prev + 1, 2)),
    () => setActiveTab((prev) => Math.max(prev - 1, 0))
  );

  const navigate = useNavigate();

  useEffect(() => {
    setBuyOrders(buyData?.orders?.slice(0, 10) || []);
    setSellOrders(sellData?.orders?.slice(0, 10) || []);
    setTradesData(tradesData?.slice(0, 10) || []);
  }, [buyData, sellData, tradesData, refetchBuy, refetchSell]);

  const calculateTotals = (orders: IOrder[]) => {
    if (!orders || orders.length === 0) {
      return {
        totalRemain: new Decimal(0),
        totalValue: new Decimal(0),
        weightedPrice: new Decimal(0),
        buyAvgPrice: new Decimal(0),
      };
    }

    const totalRemain = orders.reduce(
      (sum, order) => sum.plus(new Decimal(order.remain || 0)),
      new Decimal(0)
    );

    const totalValue = orders.reduce(
      (sum, order) => sum.plus(new Decimal(order.value || 0)),
      new Decimal(0)
    );

    const weightedPrice = totalRemain.gt(0)
      ? orders
          .reduce(
            (sum, order) =>
              sum.plus(
                new Decimal(order.price).times(new Decimal(order.remain || 0))
              ),
            new Decimal(0)
          )
          .div(totalRemain)
      : new Decimal(0);

    const buyAvgPrice = totalRemain.gt(0)
      ? totalValue.div(totalRemain)
      : new Decimal(0);

    return {
      totalRemain,
      totalValue,
      weightedPrice,
      buyAvgPrice,
    };
  };

  const calculateUserPercentage = (orders: IOrder[], percentage: number) => {
    const targetRemain = calculateTotals(orders)
      .totalRemain.times(percentage)
      .div(100);
    let accumulatedRemain = new Decimal(0);
    let weightedSum = new Decimal(0);
    let totalValue = new Decimal(0);

    for (const order of orders) {
      const orderRemain = new Decimal(order.remain || 0);
      const orderValue = new Decimal(order.value || 0);
      const orderPrice = new Decimal(order.price);

      if (accumulatedRemain.plus(orderRemain).gt(targetRemain)) {
        const remainingFraction = targetRemain.minus(accumulatedRemain);
        weightedSum = weightedSum.plus(remainingFraction.times(orderPrice));
        totalValue = totalValue.plus(remainingFraction.times(orderValue));
        break;
      } else {
        accumulatedRemain = accumulatedRemain.plus(orderRemain);
        weightedSum = weightedSum.plus(orderRemain.times(orderPrice));
        totalValue = totalValue.plus(orderValue);
      }
    }

    return {
      totalRemain: targetRemain,
      weightedPrice: accumulatedRemain.gt(0)
        ? weightedSum.div(accumulatedRemain)
        : new Decimal(0),
      totalValue,
    };
  };

  const {
    totalRemain: buyRemain,
    totalValue: buyValue,
    weightedPrice: buyAvgPrice,
  } = calculateTotals(buyOrders);
  const {
    totalRemain: sellRemain,
    totalValue: sellValue,
    weightedPrice: sellPrice,
  } = calculateTotals(sellOrders);

  const userBuyData = calculateUserPercentage(buyOrders, percentage);
  const userSellData = calculateUserPercentage(sellOrders, percentage);

  return (
    <>
      <div onClick={() => navigate("/")} className="cursor-pointer p-2 mb-1">
        <h2>بازگشت به صفحه اصلی</h2>
      </div>
      {market && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: 5,
              alignItems: "center",
              borderRadius: 5,
              boxShadow: 4,
              border: 1,
              borderColor: "#02a67f",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img
                src={market?.currency1.image}
                alt={market?.currency1.title_fa}
                className="w-24 h-24"
              />
              <Typography variant="h6">{market?.currency1.title_fa}</Typography>
              <Typography variant="body2">{market?.currency1.code}</Typography>
            </Box>
            <Box>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Typography variant="h5">
                  {PersianDigit(String(market?.price_info?.price))}
                </Typography>
                <Typography>
                  {market?.currency2.code === "IRT" ? "تومان" : "تتر"}
                </Typography>
              </Box>
              <Typography
                variant="h5"
                className={`${
                  market?.price_info?.change > 0
                    ? "text-green-500"
                    : market?.price_info?.change < 0
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {PersianDigit((market?.price_info?.change ?? 0).toFixed(2))} %
              </Typography>
            </Box>
          </Box>

          <Box mt={3}>
            <CustomTabs
              tabs={["سفارش‌های خرید", "سفارش‌های فروش", "معاملات"]}
              value={activeTab}
              onChange={(newValue) => setActiveTab(newValue)}
            />

            {activeTab === 0 && (
              <OrderTable data={buyOrders} code={market?.currency2?.code} />
            )}
            {activeTab === 1 && (
              <OrderTable data={sellOrders} code={market?.currency2?.code} />
            )}
            {activeTab === 2 && (
              <OrderTable
                data={tradesOrders}
                code={market?.currency2?.code}
                activeTab={2}
              />
            )}
          </Box>

          {activeTab === 0 && (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                  marginY: "2rem",
                  padding: 5,
                  alignItems: "start",
                  borderRadius: 5,
                  boxShadow: 4,
                  border: 1,
                  borderColor: "#02a67f",
                }}
              >
                <div className="w-full">
                  <label className="block mb-1">درصد حجم</label>
                  <input
                    type="number"
                    value={percentage}
                    onChange={(e) => setPercentage(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                    placeholder="مقدار را وارد کنید"
                  />
                </div>
                <Typography>
                  مجموع باقیمانده خرید: {PersianDigit(buyRemain.toFixed(8))}
                </Typography>
                <Typography>
                  مجموع ارزش خرید: {PersianDigit(buyValue.toFixed(2))}
                </Typography>
                <Typography>
                  میانگین وزنی قیمت خرید: {PersianDigit(buyAvgPrice.toFixed(2))}
                </Typography>
                <Typography>
                  با {PersianDigit(percentage)}% حجم:{" "}
                  {PersianDigit(userBuyData?.totalRemain.toFixed(8))} | قیمت
                  میانگین: {PersianDigit(userBuyData?.weightedPrice.toFixed(2))}{" "}
                  | مبلغ پرداختی:{" "}
                  {PersianDigit(userBuyData?.totalValue.toFixed(2))}
                </Typography>
              </Box>
            </>
          )}

          {activeTab === 1 && (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                  marginY: "2rem",
                  padding: 5,
                  alignItems: "start",
                  borderRadius: 5,
                  boxShadow: 4,
                  border: 1,
                  borderColor: "#02a67f",
                }}
              >
                <div className="w-full">
                  <label className="block mb-1">درصد حجم</label>
                  <input
                    type="number"
                    value={percentage}
                    onChange={(e) => setPercentage(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                    placeholder="مقدار را وارد کنید"
                  />
                </div>

                <Typography>
                  مجموع باقیمانده فروش: {PersianDigit(sellRemain.toFixed(8))}
                </Typography>
                <Typography>
                  مجموع ارزش فروش: {PersianDigit(sellValue.toFixed(2))}
                </Typography>
                <Typography>
                  میانگین وزنی قیمت فروش: {PersianDigit(sellPrice.toFixed(2))}
                </Typography>

                <Typography>
                  با {PersianDigit(percentage)}% حجم:{" "}
                  {PersianDigit(
                    Number(userSellData?.totalRemain || 0).toFixed(8)
                  )}{" "}
                  | قیمت میانگین:{" "}
                  {PersianDigit(
                    Number(userSellData?.weightedPrice || 0).toFixed(2)
                  )}{" "}
                  | مبلغ دریافتی:{" "}
                  {PersianDigit(
                    Number(userSellData?.totalValue || 0).toFixed(2)
                  )}
                </Typography>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
};

export default MarketDetails;
