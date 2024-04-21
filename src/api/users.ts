import axios from "axios";
import { dev_url } from "../constants";

const local_url = dev_url+'users/';

export const allUsers = async () => {
    try {
        const response = await axios.get(local_url+'getUsers');
        const data = response.data.payload.map((items:any, index:number) => {
            return {
                "id":index,
                ...items
            }
        })
        return data; // Assuming the payload contains the top orders
    } catch (error) {
        console.error('Error fetching top orders:', error);
        throw error;
    }
};

export const singleUsers = async (id:string) => {
    try {
        console.log("id");
        const response = await axios.get(local_url+'getUsers/'+id);
        return response.data.payload; // Assuming the payload contains the top orders
    } catch (error) {
        console.error('Error fetching top orders:', error);
        throw error;
    }
};
