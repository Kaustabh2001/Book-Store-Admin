import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import { country_stats } from "../../api/stats";
import Loading from "../loader/loading";

const options = {
    colorAxis: { colors: ["#0000ff", "#ff0000"] },
    backgroundColor: "#81d4fa",
    datalessRegionColor: "#f8bbd0",
    defaultColor: "#f5f5f5",
  };

const GeoChart = () => {

    const {data, isLoading} = useQuery({
        queryFn: () => country_stats(),
        queryKey: ["country_stats"]
    })

  return (
        <div className="geoChart box">    
            <h2>Order Distribution</h2>
            <br />
            <div>
                {isLoading ? <Loading /> :
                <Chart
                chartEvents={[
                    {
                    eventName: "select",
                    callback: ({ chartWrapper }) => {
                        const chart = chartWrapper.getChart();
                        const selection = chart.getSelection();
                        if (selection.length === 0) return;
                        const region = data[selection[0].row + 1];
                        console.log("Selected : " + region);
                    },
                    },
                ]}
                chartType="GeoChart"
                width="100%"
                height="600px"
                data={data}
                options={options}
                />}
        </div>
    </div>


  );
}

export default GeoChart;