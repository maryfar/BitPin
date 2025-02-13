import React from "react";
import moment from "moment-timezone";
import { PersianDigit } from "../services/utils/PersionDigit";

interface OrderTableProps {
  data: Array<{
    remain?: number;
    price: number;
    value: number;
    time?: number;
    match_amount?: number;
    type?: "sell" | "buy";
  }>;
  activeTab?: number;
  code: string;
}

const formatPrice = (price: number, code: string) => {
  const persianPrice = PersianDigit(price);

  switch (code) {
    case "IRT":
      return `${persianPrice} تومان`;
    case "USDT":
      return `${persianPrice} تتر`;
    default:
      return price.toLocaleString();
  }
};

const formatIranTime = (timestamp?: number) => {
  if (!timestamp) return "-";
  return moment.unix(timestamp).tz("Asia/Tehran").format("HH:mm:ss");
};

const OrderTable: React.FC<OrderTableProps> = ({ data, activeTab, code }) => {
  return (
    <div className="overflow-x-auto w-full shadow-md rounded-lg p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-400">
            <th className="p-3 text-right">
              {activeTab === 2 ? "مقدار" : "باقیمانده"}
            </th>
            <th className="p-3 text-right">قیمت</th>
            <th className="p-3 text-right">
              {activeTab === 2 ? "زمان" : "ارزش"}
            </th>
            {activeTab === 2 && <th className="p-3 text-right">نوع</th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index} className="border-t dark:border-gray-500 ">
              <td className="p-3">
                {activeTab === 2
                  ? PersianDigit(String(item.match_amount))
                  : PersianDigit(String(item.remain))}
              </td>
              <td className="p-3">{formatPrice(item?.price, code)}</td>
              <td className="p-3">
                {activeTab === 2
                  ? PersianDigit(String(formatIranTime(item.time)))
                  : PersianDigit(String(item.value))}
              </td>
              {activeTab === 2 && (
                <td className="p-3">
                  {item.type && (
                    <span
                      className={`px-2 py-1 text-xs font-bold uppercase rounded ${
                        item.type === "sell"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-200"
                      }`}
                    >
                      {item.type === "sell" ? "فروش" : "خرید"}
                    </span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
