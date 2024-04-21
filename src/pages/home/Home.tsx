import { useQuery } from "@tanstack/react-query";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import ChartBox from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieCartBox/PieChartBox";
import TopBox from "../../components/topBox/TopBox";
import "./home.scss";
import { product_stats, revenue_stats, review_stats, user_stats } from "../../api/stats";
import Loading from "../../components/loader/loading";
import GeoChart from "../../components/geoChart/geoChart";

const Home = () => {

  const {data: userStatsData, isLoading:isUserStatsLoading} = useQuery({
    queryKey: ["user_stats"],
    queryFn: () => user_stats()
  })

  const {data: revenueStatsData, isLoading:isRevenueStatsLoading} = useQuery({
    queryKey: ["revenue_stats"],
    queryFn: () => revenue_stats()
  })

  const {data: productsStatsData, isLoading:isProductStatsLoading} = useQuery({
    queryKey: ["product_stats"],
    queryFn: () => product_stats()
  })

  const {data: reviewStatsData, isLoading:isReviewStatsLoading} = useQuery({
    queryKey: ["review_stats"],
    queryFn: () => review_stats()
  })



  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        { isUserStatsLoading ? <Loading />:
        <ChartBox {...userStatsData} />}
      </div>
      <div className="box box3">
        { isProductStatsLoading ? <Loading />:
        <ChartBox {...productsStatsData} />}
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box5">
        { isReviewStatsLoading ? <Loading /> :
          <ChartBox {...reviewStatsData} />}
      </div>
      <div className="box box6">
      { isRevenueStatsLoading ? <Loading />:
        <ChartBox {...revenueStatsData} />}
      </div>
      <div className="box box7">
        <BigChartBox />
      </div>
      <div className="geoChart">
        <GeoChart />
  </div>
    </div>
  );
};

export default Home;
