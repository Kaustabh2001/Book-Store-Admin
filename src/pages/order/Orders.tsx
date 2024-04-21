import "./orders.scss";
import Card from "../../components/card/card";
import { useQuery } from "@tanstack/react-query";
import { allOrders } from "../../api/orders";
import Loading from "../../components/loader/loading";

const Orders = () => {

    const { data, isLoading, isError } = useQuery({
        queryFn: () => allOrders(),
        queryKey: ["allOrders"]
    });

    console.log(data)

    return (
        <div>
          <div>
            <h1>Orders</h1>
          </div>
          <br />
          {isLoading ? (
            <Loading />
          ) : (
            data.map((orders: any) => (
              <div className="Orders" key={orders.id}>
                <Card Orders={orders} />
              </div>
            ))
          )}
        </div>
      );
};

export default Orders;