import { useQuery } from "@tanstack/react-query";
import Single from "../../components/single/Single"
import "./user.scss"
import { useParams } from 'react-router-dom';
import { singleUsers } from "../../api/users";
import Loading from "../../components/loader/loading";

const User = () => {

  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError} = useQuery({
    queryKey: ["singleUsers", id],
    queryFn: async (params:any) => {
      const _id = String(params.queryKey[1]);
      return {
        "role": "Book",
        ...await singleUsers(_id)
      };
    }
  });
  console.log(data)

  return (
    <div className="user">
      {isLoading ? (
        <Loading />
      ):<Single {...data}/>}
      
    </div>
  )
}

export default User