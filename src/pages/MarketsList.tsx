import { useState } from "react";
import { useFetchMarkets } from "../services/hooks/useFetchMarkets";
import PaginationControls from "../components/PaginationControls";
import MiniChart from "../components/MiniChart";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { PersianDigit } from "../services/utils/PersionDigit";
import { useSwipe } from "../services/hooks/useswipe";

const MarketList = () => {
  const { data: markets, isLoading, isError } = useFetchMarkets();
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  const uniqueCurrencies = Array.from(
    new Set(markets?.map((market) => market.currency2.title))
  );

  useSwipe(
    () =>
      setTabIndex((prev) => {
        const newIndex = Math.min(prev + 1, uniqueCurrencies.length);
        setFilter(newIndex === 0 ? "" : uniqueCurrencies[newIndex - 1]);
        return newIndex;
      }),
    () =>
      setTabIndex((prev) => {
        const newIndex = Math.max(prev - 1, 0);
        setFilter(newIndex === 0 ? "" : uniqueCurrencies[newIndex - 1]);
        return newIndex;
      })
  );

  if (isLoading)
    return (
      <div className="flex justify-center mt-8">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );

  if (isError) {
    enqueueSnackbar(" خطایی رخ داد. ", { variant: "error" });
  }

  const ITEMS_PER_PAGE = 10;

  const filteredMarkets = filter
    ? markets?.filter((market) => market.currency2.title === filter)
    : markets;

  const totalPages = Math.ceil((filteredMarkets?.length || 0) / ITEMS_PER_PAGE);
  const paginatedMarkets = filteredMarkets?.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="mx-auto p-4 shadow-lg rounded-lg w-full">
      <div className="overflow-x-auto mb-8">
        <div className="flex space-x-2 dark:border-gray-700">
          <button
            onClick={() => {
              setTabIndex(0);
              setFilter("");
            }}
            className={`py-3 cursor-pointer px-6 ml-2 text-md font-semibold border-b-3 hover:bg-[#02a67f] ${
              tabIndex === 0
                ? "border-[#02a67f] text-[#02a67f]"
                : "text-gray-500"
            }`}
          >
            همه
          </button>
          {uniqueCurrencies.map((currency, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTabIndex(idx + 1);
                setFilter(currency);
              }}
              className={`py-3 cursor-pointer px-6 ml-2 text-md font-semibold border-b-3 hover:bg-[#02a67f] ${
                tabIndex === idx + 1
                  ? "border-[#02a67f] text-[#02a67f]"
                  : "text-gray-500"
              }`}
            >
              {currency === "Tether" ? "تتر" : "تومان"}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto w-full rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-400">
              <th className="p-3 text-right">نام ارز</th>
              <th className="p-3 text-right">قیمت</th>
              <th className="p-3 text-right">تغییرات ۲۴ساعته</th>
              <th className="p-3 text-right">درصد تغییر</th>
              <th className="p-3 text-right">تگ‌ها</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMarkets?.map((market) => (
              <tr
                key={market.id}
                onClick={() => navigate(`/market/${market.id}`)}
                className="cursor-pointer border-t border-gray-300 dark:border-gray-500"
              >
                <td className="p-3 flex items-center space-x-2">
                  <img
                    src={market.currency1.image}
                    alt={market.currency1.title}
                    className="w-6 h-6"
                  />
                  <span>{market.currency1.title_fa}</span>
                  <span className="text-xs"> / {market.currency1.title}</span>
                </td>
                <td className="p-3 font-semibold">
                  {PersianDigit(String(market.price_info.price))}{" "}
                  {market?.currency2.code === "IRT" ? "تومان" : "تتر"}
                </td>
                <td className="p-3 w-1/5">
                  <MiniChart
                    min={Number(market.price_info.min)}
                    max={Number(market.price_info.max)}
                    currentPrice={Number(market.price_info.price)}
                  />
                </td>
                <td
                  className={`p-3 text-center font-semibold ${
                    market.price_info.change > 0
                      ? "text-green-500"
                      : market.price_info.change < 0
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {market.price_info.change > 0
                    ? `${market.price_info.change.toFixed(2)}+`
                    : market.price_info.change < 0
                    ? `${Math.abs(market.price_info.change).toFixed(2)}-`
                    : market.price_info.change?.toFixed(2)}
                </td>
                <td className="p-3 flex flex-wrap space-x-1">
                  {market.currency2.tags?.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-xs border border-[#02a67f] rounded-full px-2 py-1"
                    >
                      {tag.name}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={(_, value) => setPage(value)}
      />
    </div>
  );
};

export default MarketList;
