// import Decimal from "decimal.js";
// import { useFetchOrders } from "@/hooks/useFetchOrders";

// const OrderBook = ({ type }) => {
//   const { orders } = useFetchOrders(type);

//   const totalRemain = orders.reduce(
//     (sum, order) => new Decimal(sum).plus(order.remain),
//     new Decimal(0)
//   );
//   const totalValue = orders.reduce(
//     (sum, order) => new Decimal(sum).plus(order.value),
//     new Decimal(0)
//   );
//   const weightedPrice = totalRemain.gt(0)
//     ? totalValue.dividedBy(totalRemain)
//     : new Decimal(0);

//   return (
//     <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
//       <h2 className="text-lg font-bold">
//         {type === "buy" ? "سفارشات خرید" : "سفارشات فروش"}
//       </h2>
//       <ul>
//         {orders.map((order) => (
//           <li key={order.id} className="flex justify-between">
//             <span>{new Decimal(order.remain).toFixed(8)}</span>
//             <span>{new Decimal(order.price).toFixed(2)}</span>
//           </li>
//         ))}
//       </ul>
//       <div className="mt-2 text-sm">
//         <p>مجموع حجم: {totalRemain.toFixed(8)}</p>
//         <p>مجموع مبلغ: {totalValue.toFixed(2)}</p>
//         <p>میانگین قیمت: {weightedPrice.toFixed(2)}</p>
//       </div>
//     </div>
//   );
// };
// export default OrderBook;
