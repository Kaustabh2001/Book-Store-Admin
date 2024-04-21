import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newBook, updateBook } from "../../api/books";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

interface inputFileds {
  field: string,
  headerName: string,
  type: string
}

interface formData {
  "ISBN": string,
  "Author of the Book": string,
  "Genre": string,
  "Image Link": string,
  "Name of the Book": string,
  "Publisher of the Book": string,
  "Purchase Cost": string,
  "Selling Cost": string,
  "Year of Publication": string,
  "Available_pieces": string
}

type Props = {
  slug: string;
  columns: inputFileds[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  originalValues?: formData;
};

const Add = (props: Props) => {

  const emptyFormData: formData = {
    "ISBN": "",
    "Author of the Book": "",
    "Genre": "",
    "Image Link": "",
    "Name of the Book": "",
    "Publisher of the Book": "",
    "Purchase Cost": "",
    "Selling Cost": "",
    "Year of Publication": "",
    "Available_pieces": ""
  };

  const [formData, setFormData] = useState<formData >(props.originalValues || emptyFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const newFormData:formData = {...formData};
    newFormData[fieldName as keyof formData] = e.target.value;
    setFormData(newFormData);
  };

  // TEST THE API

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (formData: formData) => {
      const payload = {
        ISBN: formData.ISBN,
        Name: formData["Name of the Book"],
        Cover_Image: formData["Image Link"],
        Selling_cost: parseFloat(formData["Selling Cost"]),
        Available_pieces: parseInt(formData.Available_pieces),
        Author: formData["Author of the Book"],
        Publisher: formData["Publisher of the Book"],
        Year_of_Publication: parseInt(formData["Year of Publication"]),
        Purchase_Cost: parseFloat(formData["Purchase Cost"]),
        Genre: formData.Genre
      };
      console.log(payload);
      const message = await newBook(payload);
      console.log(message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`allBooks`]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (formData: formData) => {
      const payload = {
        ISBN: formData.ISBN,
        Name: formData["Name of the Book"],
        Cover_Image: formData["Image Link"],
        Selling_cost: parseFloat(formData["Selling Cost"]),
        Available_pieces: parseInt(formData.Available_pieces),
        Author: formData["Author of the Book"],
        Publisher: formData["Publisher of the Book"],
        Year_of_Publication: parseInt(formData["Year of Publication"]),
        Purchase_Cost: parseFloat(formData["Purchase Cost"]),
        Genre: formData.Genre
      };
      console.log(payload);
      const message = await updateBook(payload);
      console.log(message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`allBooks`]);
    },
  });

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   //add new item
  //   // mutation.mutate();
  //   props.setOpen(false)
  // };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Now you can access the form data from the state
    console.log(formData);
    //mutation.mutate(formData);

    // Clear the form data after submission
    if(props.originalValues)
      updateMutation.mutate(formData);
    else
      createMutation.mutate(formData);

    setFormData(emptyFormData);

    props.setOpen(false);
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item">
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.field} value={formData[column.field] || ''}
                  onChange={(e) => handleInputChange(e, column.field)} />
              </div>
            ))}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
