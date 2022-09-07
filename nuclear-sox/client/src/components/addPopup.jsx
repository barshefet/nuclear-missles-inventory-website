import React, { useState } from "react";

// the add componnet pops up when the add new item is clicked at the main page
// the componnet contains a form with all the relavent inputs. when submitted the values
// are sent to the db ass a new Item
const AddItem = (props) => {
  const [model, setModel] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [history, setHistory] = useState("");
  const [year, setYear] = useState("");
  const [officer, setOfficer] = useState("");
  const [location, setLocation] = useState("");

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
    fetch("/add", options);
    window.location.reload();
  };

  return props.trigger ? (
    <>
      <div className="popup-container">
        <button className="close" onClick={() => props.setTrigger(false)}>
          Close
        </button>

        <form action="submit" onSubmit={onFormSubmmit}>
          <input
            type="text"
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <input
            type="text"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="Size"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="Location-History"
            value={history}
            onChange={(e) => setHistory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Manufacturing-Year"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="Officer"
            value={officer}
            onChange={(e) => setOfficer(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button>Add New Item</button>
        </form>
      </div>
    </>
  ) : (
    ""
  );
};

export default AddItem;
