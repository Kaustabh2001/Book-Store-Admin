import axios from "axios";
import { dev_url } from "../constants";

const local_url = dev_url+'stats/'

export const stats = async (start:string, end:string) => {
    try {
        const response = await axios.get(local_url, {params: {
            start: start,
            end: end
        }});
        const result = response.data.payload.map((item:any) => {
            return {
                "Date":item.Date,
                "Cost_Volume": parseFloat(item.Cost_Volume),
                "Sales_Volume": parseFloat(item.Sales_Volume),
                "New_Users": parseInt(item.New_Users),
                "Books_Sold": parseInt(item.Books_Sold)
            }
        })
        return result; 
    } catch (error) {
        console.error('Error fetching top orders:', error);
        throw error;
    }
};

export const user_stats = async () => {
    try {
        const response = await axios.get(local_url+'users');
        return response.data.payload; 
    } catch (error) {
        console.error('Error fetching top orders:', error);
        throw error;
    }
};

export const product_stats = async () => {
    try {
        const response = await axios.get(local_url+'books');
        return response.data.payload; 
    } catch (error) {
        console.error('Error fetching top orders:', error);
        throw error;
    }
};

export const revenue_stats = async () => {
    try {
        const response = await axios.get(local_url+'revenue');
        return response.data.payload; 
    } catch (error) {
        console.error('Error fetching top orders:', error);
        throw error;
    }
};

export const review_stats = async () => {
    try {
        const response = await axios.get(local_url+'review');
        return response.data.payload; 
    } catch (error) {
        console.error('Error fetching top orders:', error);
        throw error;
    }
};

export const country_stats = async () => {
    try {
        const response = await axios.get(local_url+'country');
        return response.data.payload; 
    } catch (error) {
        console.error('Error fetching top orders:', error);
        throw error;
    }
};

