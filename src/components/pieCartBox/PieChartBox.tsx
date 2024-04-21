import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./pieChartBox.scss";
import { useQuery } from "@tanstack/react-query";
import { getBooksByGenre } from "../../api/books";
import Loading from "../loader/loading";

const PieChartBox = () => {
  const {data, isError, isLoading} = useQuery({
    queryFn: () => getBooksByGenre(),
    queryKey: ["BooksByGenre"],
  });
  console.log(data)
  return (
    <div className="pieChartBox">
      <h1>Sales by Genre</h1>
      {isLoading ? (<Loading />) :
      <>
        <div className="chart">
          <ResponsiveContainer width="99%" height={300}>
            <PieChart>
              <Tooltip
                contentStyle={{ background: "white", borderRadius: "5px" }}
              />
              <Pie
                data={data}
                innerRadius={"70%"}
                outerRadius={"90%"}
                paddingAngle={5}
                dataKey="BooksSold"
              >
                {data.map((items:any) => (
                  <Cell key={items.Genre} fill={items.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="options">
          {data.map((item:any) => (
            <div className="option" key={item.Genre}>
              <div className="title">
                <div className="dot" style={{ backgroundColor: item.color }} />
                <span>{item.Genre}</span>
              </div>
              <span>{item.BooksSold}</span>
            </div>
          ))}
        </div>
      </>}
    </div>
  );
};

export default PieChartBox;
