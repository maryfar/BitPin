// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import MiniChart from "../components/MiniChart";

// const MarketTable = ({ paginatedMarkets: }) => {
//   return (
//     <TableContainer component={Paper} elevation={3}>
//       <Table>
//         <TableHead>
//           <TableRow className="bg-gray-100 dark:bg-gray-800">
//             <TableCell className="font-semibold">Currency</TableCell>
//             <TableCell className="font-semibold">Image</TableCell>
//             <TableCell className="font-semibold">Chart</TableCell>
//             <TableCell className="font-semibold">24H Change</TableCell>
//             <TableCell className="font-semibold">Tags</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {paginatedMarkets?.map((market) => (
//             <TableRow
//               key={market.id}
//               className="hover:bg-gray-50 dark:hover:bg-gray-700"
//             >
//               {/* Currency Name */}
//               <TableCell>
//                 {market.currency2.title} ({market.currency1.code} /{" "}
//                 {market.currency1.title_fa})
//               </TableCell>

//               {/* Currency Image */}
//               <TableCell>
//                 <img
//                   src={market.currency1.image}
//                   alt={market.currency1.title}
//                   className="w-6 h-6"
//                 />
//               </TableCell>

//               {/* Mini Chart */}
//               <TableCell>
//                 <MiniChart
//                   min={Number(market.price_info.min)}
//                   max={Number(market.price_info.max)}
//                   currentPrice={Number(market.price_info.price)}
//                 />
//               </TableCell>

//               {/* Price Change */}
//               <TableCell
//                 className={`text-sm ${
//                   market.price_info.change > 0
//                     ? "text-green-500"
//                     : market.price_info.change < 0
//                     ? "text-red-500"
//                     : "text-gray-500"
//                 }`}
//               >
//                 {market?.price_info?.change > 0
//                   ? `+${market.price_info.change.toFixed(2)}`
//                   : market.price_info?.change < 0
//                   ? `-${Math.abs(market.price_info?.change).toFixed(2)}`
//                   : market.price_info?.change?.toFixed(2)}
//               </TableCell>

//               {/* Tags */}
//               <TableCell>
//                 {market.currency2.tags?.map((tag) => (
//                   <span
//                     key={tag.id}
//                     className="text-red-500 border border-red-500 rounded-lg px-2 py-1 ml-1 text-xs"
//                   >
//                     {tag.name}
//                   </span>
//                 ))}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default MarketTable;
