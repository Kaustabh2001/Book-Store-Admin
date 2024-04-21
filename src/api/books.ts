import axios from "axios";
import { dev_url } from "../constants";

const local_url = dev_url+"books/";

export const getBooksByGenre = async () => {
    try {
        const response = await axios.get(local_url+'getBooksByGenre');
        const booksWithColor = response.data.payload.map((book:any, index:any) => {
            const colors = ['#40E0D0', '#E6E6FA', '#DC143C', '#7FFF00', '#4B0082', '#DAA520'];
            const colorIndex = index % colors.length;
            const color = colors[colorIndex];
            return {
                "Genre":book.Genre,
                "BooksSold":parseInt(book.BooksSold),
                color
            };
        });
        return booksWithColor;

    } catch (error) {
        console.error('Error fetching top orders:', error);
        throw error;
    }
};

export const allBooks = async () => {
    try {
        const response = await axios.get(local_url+'getBooks');
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

export const singleProduct = async (id:string) => {
    try {
        const response = await axios.get(local_url+'getBooks/'+id);
        return response.data.payload; // Assuming the payload contains the top orders
    } catch (error) {
        console.error('Error fetching top orders:', error);
        throw error;
    }
};

export const newBook = async (bookDetails: object) => {
    try{
        const response = await axios.post(local_url+'create', {
            ...bookDetails
        });
        return response.data.message;
    }
    catch(error) {
        console.error('Error fetching top orders:', error);
        throw error;
    }
}

export const updateBook = async (bookDetails: object) => {
    try{
        const response = await axios.patch(local_url+'update', {
            ...bookDetails
        });
        return response.data.message;
    }
    catch(error) {
        console.error('Error fetching top orders:', error);
        throw error;
    }
}

export const deleteProduct = async (id:string) => {
    try {
        const response = await axios.delete(local_url+'delete', {params: {
            id: id
        }});
        return ; 
    } catch (error) {
        console.error('Error fetching top orders:', error);
        throw error;
    }
};

