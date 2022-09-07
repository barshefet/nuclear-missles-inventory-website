import React, { useState } from "react";

//the edit Item Compponnet. after the designated edit button is clicked the related Item pops in this componnet
//with the original values at the input. the values can be changed and sent back to the db as an update
const EditItem = (props) => {
    //if edit is pressed the condition for this expression will be met
  if (props.fetchItem === true) {
    //fetches the Item that wished to be edited
    fetch(`/getById/${props.editId}`)
      .then((res) => res.json())
      .then((data) => {
        setModel(data[0].model);
        setQuantity(data[0].quantity);
        setSize(data[0].size);
        setHistory(data[0].history);
        setYear(data[0].year);
        setLocation(data[0].location);
        setOfficer(data[0].officer);
        props.setFetchItem(false);
      });
  }

  //states for the inputs
  const [model, setModel] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [history, setHistory] = useState("");
  const [year, setYear] = useState("");
  const [officer, setOfficer] = useState("");
  const [location, setLocation] = useState("");

//   when the form is submitted the input values are posted as an update to the database
  const onFormSubmmit = (e) => {
    e.preventDefault();
    const data = {
      model,
      quantity,
      size,
      history,
      year,
      officer,
      location,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(`/update/${props.editId}`, options);
    window.location.reload();
  };

  return props.trigger ? (
    <>
      <div className="popup-container">
        <button className="close" onClick={() => props.setEditPopup(false)}>
          Close
        </button>

        <form action="submit" onSubmit={onFormSubmmit}>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
          <input
            type="text"
            value={history}
            onChange={(e) => setHistory(e.target.value)}
          />
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
          <input
            type="text"
            value={officer}
            onChange={(e) => setOfficer(e.target.value)}
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button>Update Item</button>
        </form>
      </div>
    </>
  ) : (
    ""
  );
};

export default EditItem;
