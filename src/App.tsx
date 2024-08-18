import React from "react";
import "./App.css";
import SelectedItems from "./components/SelectedItems";
import SelectItemsDialog from "./components/SelectItemsDialog";

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
