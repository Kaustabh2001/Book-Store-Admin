import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./bigChartBox.scss";
import { useQuery } from "@tanstack/react-query";
import { stats } from "../../api/stats";
import Loading from "../loader/loading";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";


/*const data = [
  {
    name: "Sun",
    books: 4000,
    clothes: 2400,
    electronic: 2400,
  },
  {
    name: "Mon",
    books: 3000,
    clothes: 1398,
    electronic: 2210,
  },
  {
    name: "Tue",
    books: 2000,
    clothes: 9800,
    electronic: 2290,
  },
  {
    name: "Wed",
    books: 2780,
    clothes: 3908,
    electronic: 2000,
  },
  {
    name: "Thu",
    books: 1890,
    clothes: 4800,
    electronic: 2181,
  },
  {
    name: "Fri",
    books: 2390,
    clothes: 3800,
    electronic: 2500,
  },
  {
    name: "Sat",
    books: 3490,
    clothes: 4300,
    electronic: 2100,
  },
];*/

const BigChartBox = () => {

  const [end, setEnd] = useState<string>(String(new Date()));
  const [start, setStart] = useState<string>(():string => {
    const date = new Date();
    date.setDate(date.getDate() - 60);
    return String(date); // Format as 'YYYY-MM-DD'
  });

  const handChangeStart = (event: any) => {
    setStart(event.$d);
  }

  const handChangeEnd = (event:any) => {
    setEnd(event.$d);
  }

  const {data, isLoading} = useQuery({
    queryKey: ["Stats", start, end],
    queryFn: (params) => stats(params.queryKey[1], params.queryKey[2]),
  });
  console.log("Stats",data);
  return (
    <div className="bigChartBox">
      <h1>Revenue Analytics</h1>
      <div className="date">
        <div className="startDate">
          <h5>Start</h5>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={handChangeStart}/>
          </LocalizationProvider>
        </div>
        <div className="endDate">
          <h5>End</h5>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={handChangeEnd}/>
          </LocalizationProvider>
        </div>
      </div>
      {isLoading ? <Loading /> :
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Cost_Volume"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="Sales_Volume"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>}
    </div>
  );
};

export default BigChartBox;
