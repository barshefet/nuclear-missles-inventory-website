import React, { useEffect, useState } from "react";

// table componnet. main componnet nests delete and edit button and all of the list items inside the table
const Table = (props) => {
  const [Items, setItems] = useState([]);

  //when the page finishes loading it calls getAll()
  useEffect(() => {
    getAll();
  }, []);

  //gets all of the list items from the database
  async function getAll() {
    fetch("/allItems")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }

  //deletes an Item list that was clicked delete
  async function del(id) {
    await fetch(`del/${id}`, {
      method: "DELETE",
    });

    //page refresh is currently not working after delete and the page needs to mnualy refresh
    setItems(Items.filter((item) => item.socks_id !== id));
    window.location.reload();
  }

  return (
    <>
      <div className="tbl-header">
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr key={"thead"}>
              <th>Model</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Location-History</th>
              <th>Manufacturing-Year</th>
              <th>Officer</th>
              <th>Location</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table cellPadding="0" cellSpacing="0" border="0">
          <tbody>
            {Items.map((item) => (
              <tr key={`${item.socks_id}`}>
                <td>{item.model}</td>
                <td>{item.quantity}</td>
                <td>{item.size}</td>
                <td>{item.history}</td>
                <td>{item.year}</td>
                <td>{item.officer}</td>
                <td>{item.location}</td>
                <td>
                  <button
                    className="edit"
                    onClick={() => {
                      props.setEditPopup(true);
                      props.setEditId(item.socks_id);
                      props.setFetchItem(true);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td className="del">
                  <button
                    className="noselect"
                    onClick={() => del(item.socks_id)}
                  >
                    <span className="text">Delete</span>
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                      </svg>
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
