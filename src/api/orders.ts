import axios from "axios";
import { dev_url } from "../constants";

const local_url = dev_url+'orders/';

export const topOrders = async () => {
    try {
        const response = await axios.get(local_url+'topOrders');
        return response.data.payload; // Assuming the payload contains the top orders
    } catch (error) {
        console.error('Error fetching top orders:', error);
        throw error;
    }
};

export const allOrders = async () => {
    try {
        const response = await axios.get(local_url+'orders/');
        return response.data.payload; 
    } catch (error) {
        console.error('Error fetching top orders:', error);
        throw error;
    }
}

