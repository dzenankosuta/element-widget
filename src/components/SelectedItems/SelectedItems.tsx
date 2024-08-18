import React from "react";
import { observer } from "mobx-react-lite";
import { elementStore } from "../../store";
import "./SelectedItems.css";

const SelectedItems: React.FC = observer(() => {
  return (
    <div className="selected-items">
      <h2>Selected Items</h2>
      <ul className="selected-items-list">
        {elementStore.selectedElements.map((element, index) => (
          <li key={index} className="selected-item">
            {element}
            <button onClick={() => elementStore.removeElement(element)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SelectedItems;
