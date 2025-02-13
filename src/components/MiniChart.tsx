import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box } from "@mui/material";

interface MiniChartProps {
  min: number;
  max: number;
  currentPrice: number;
}

const MiniChart: React.FC<MiniChartProps> = ({ min, max, currentPrice }) => {
  const data = [
    { time: "00:00", price: min },
    { time: "12:00", price: (min + max) / 2 },
    { time: "24:00", price: max },
    { time: "Now", price: currentPrice },
  ];

  return (
    <Box>
      <ResponsiveContainer width="100%" height={50}>
        <LineChart data={data}>
          <XAxis dataKey="time" hide />
          <YAxis hide />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MiniChart;
