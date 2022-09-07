import React, { useState } from "react";
import Add from "./components/AddButton";
import AddItem from "./components/addPopup";
import "./components/addPopup.scss";
import EditItem from "./components/EditButton";
import Table from "./components/Table";
import "./components/Table.scss";
import "./components/AddButton.sass";
import "./components/addPopup";

const App = () => {
  const [Trigger, setTrigger] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [editId, setEditId] = useState("");
  const [fetchItem, setFetchItem] = useState(false);

  return (
    <>
      <div className="headline">
        <h1>Nuclear-Sox</h1>
        <Add setTrigger={setTrigger} />
      </div>
      <AddItem trigger={Trigger} setTrigger={setTrigger} />
      <Table
        setEditPopup={setEditPopup}
        setEditId={setEditId}
        setFetchItem={setFetchItem}
      />
      <EditItem
        trigger={editPopup}
        setEditPopup={setEditPopup}
        editId={editId}
        fetchItem={fetchItem}
        setFetchItem={setFetchItem}
      />
    </>
  );
};

export default App;
