import React from "react";
import "./card.scss";

/*const userName = "John Doe";
const bookName = "The Great Gatsby";
const numberOfBooks = 3;
const totalCost = 30;
const address = {
  streetNo: "123 Main Street",
  state: "California",
  country: "USA",
  pincode: "12345",
};*/

interface Details {
    Book_Name: string,
    No_Of_Pieces: number,
    Cost: string
}

interface Orders {
    _id: string,
    Customer_Name: string,
    Status: string,
    Date: string,
    Order_Details: Details[],
    Total_Cost: string,
    Street: string,
    City: string,
    State: string,
    Country: string,
    Pincode: number
}

type Props = {
    Orders: Orders
};

const Card = (props: Props) => {
    console.log("Hi");
    return (
        <div className="card">
          <div className="partA">
            <div className="details">
                <div>
                    <span><strong>User Name:</strong> {props.Orders.Customer_Name}</span>
                </div>
                <br />
                {props.Orders.Order_Details.map((items:Details) => (
                    <div className="book_details" key={items.Book_Name}>
                        <span className="Book"><strong>Book Name:</strong> {items.Book_Name}</span>
                        <span><strong>Number of Pieces:</strong> {items.No_Of_Pieces}</span>
                        <span><strong>Cost:</strong> ${items.Cost}</span>
                    </div>
                ))}
                <br />
            </div>
            <div>
                <hr />
                <br />
                <div className="cost">
                    <span>Total Cost</span>
                    <span>${props.Orders.Total_Cost}</span>
                </div>
            </div>
          </div>
          <div className="partB">
            <h2>Address</h2>
            <div>
              <span>
                <strong>Street:</strong>{props.Orders.Street}
              </span>
            </div>
            <div>
              <span><strong>City:</strong> {props.Orders.City}</span>
            </div>
            <div>
              <span><strong>Country:</strong> {props.Orders.Country} </span>
            </div>
            <div>
              <span><strong>Pincode:</strong> {props.Orders.Pincode} </span>
            </div>
          </div>
        </div>
      );
}

export default Card;
