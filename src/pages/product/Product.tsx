import { useParams } from "react-router-dom";
import Single from "../../components/single/Single"
import "./product.scss";
import { singleProduct } from "../../api/books";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/loader/loading";

const Product = () => {

  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError} = useQuery({
    queryKey: ["singleBooks", id],
    queryFn: async (params:any) => {
      const _id = String(params.queryKey[1]);
      return {
        "role": "User",
        ...await singleProduct(_id)
      };
    }
  });

  //Fetch data and send to Single Component
  return (
    <div className="product">
      {isLoading ? <Loading />:
       <Single {...data}/>}
    </div>
  )
}

export default Product