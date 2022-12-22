import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import data from "./testData.json"; // JSON file with made-up data for debugging

function Chart() {
  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <BarChart width={500} height={250} data={data}>
        <XAxis dataKey="time" stroke="#B0B3B8" />
        <Bar dataKey="co2" fill="#8884D8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Chart;
