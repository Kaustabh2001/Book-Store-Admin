import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./single.scss";
import EditIcon from '@mui/icons-material/Edit';
import Add from "../add/Add";
import { useState } from "react";

interface info {
  _id: string,
  ISBN: string,
  Name: string,
  Cover_Image: string,
  Selling_Cost: string,
  Available_pieces: number,
  Author: string,
  Publisher: string,
  Year_of_Publication: number,
  Purchase_Cost: string,
  Genre: string,
  Rating: number,
  "Total Units Sold": string,
  "Total Sales": string
}

type Props = {
  role: string;
  id: string;
  img?: string;
  title: string;
  info: info;
  chart?: {
    dataKeys: { name: string; color: string }[];
    data: object[];
  };
  activities?: { 
    "Name": string,
    "numberOfPieces": number,
    "orderId": string,
    "address": string,
    "cost": string,
    "date":string 
  }[];
};

const inputfields = [
  { field: "ISBN", headerName: "ISBN", type: "number" },
  {
    field: "Image Link",
    headerName: "Cover Image",
    type: "string"
  },
  {
    field: "Name of the Book",
    type: "string",
    headerName: "Title",
  },
  {
    field: "Author of the Book",
    type: "string",
    headerName: "Author",
  },
  {
    field: "Publisher of the Book",
    headerName: "Publisher",
    flex:1,
    type: "string",
  },
  {
    field: "Purchase Cost",
    type: "string",
    headerName: "Cost Price",
  },
  {
    field: "Selling Cost",
    headerName: "Selling Price",
    type: "string",
  },
  {
    field: "Available_pieces",
    headerName: "In Stock",
    type: "number",
  },
  {
    field: "Year of Publication",
    headerName: "Year of Publication",
    type: "number"
  },
  {
    field: "Genre",
    headerName: "Genre",
    type: "string"
  }
];

const Single = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {props.img && <img src={props.img} alt="" />}
            <h1>{props.title}</h1>
            {props.role==="User" ? <EditIcon sx={{"cursor":"pointer"}} onClick={() => setOpen(true)}/>: <></>}
          </div>
          <div className="details">
            {Object.entries(props.info).map((item) => (
              <div className="item" key={item[0]}>
                <span className="itemTitle">{item[0]}</span>
                <span className="itemValue">{item[1]}</span>
              </div>
            ))}
          </div>
        </div>
        <hr />
        {props.chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.chart.dataKeys.map((dataKey) => (
                  <Line
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="activities">
        <h2>Latest Orders</h2>
        {props.activities && (
          <ul>
            {props.activities.map((activity) => (
              <li key={activity.Name}>
                <div>
                  <h4>{props.role} Name</h4>
                  <p>{activity.Name}</p>
                  <br />
                  <h4>Address</h4>
                  <p>{activity.address}</p>
                  <br />
                  <h4>Number of Peices</h4>
                  <p>{activity.numberOfPieces}</p>
                  <br />
                  <time>{activity.date}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {open && <Add slug="product" columns={inputfields} setOpen={setOpen} originalValues={{
        "ISBN": props.info.ISBN,
        "Author of the Book": props.info.Author,
        "Genre": props.info.Genre,
        "Image Link": props.info.Cover_Image,
        "Name of the Book": props.info.Name,
        "Publisher of the Book": props.info.Publisher,
        "Purchase Cost": props.info.Purchase_Cost,
        "Selling Cost": props.info.Selling_Cost,
        "Year of Publication": String(props.info.Year_of_Publication),
        "Available_pieces": String(props.info.Available_pieces)
      }} />}
    </div>
  );
};

export default Single;
