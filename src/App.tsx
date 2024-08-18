import React from "react";
import "./App.css";
import SelectedItems from "./components/SelectedItems/SelectedItems";
import SelectItemsDialog from "./components/SelectItemsDialog/SelectItemsDialog";

const App: React.FC = () => {
  return (
    <div>
      <h1 className="app-title">Element Widget</h1>
      <SelectedItems />
      <SelectItemsDialog />
    </div>
  );
};

export default App;
