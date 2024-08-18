import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { elementStore } from "../../store";
import "./SelectItemsDialog.css";

const elements = Array.from({ length: 300 }, (_, i) => `Element ${i + 1}`);

const SelectItemsDialog: React.FC = observer(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedElements, setTempSelectedElements] = useState<string[]>(
    elementStore.selectedElements
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  const toggleDialog = () => {
    if (isOpen) {
      setFilter("");
      setSearchQuery("");
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setTempSelectedElements(elementStore.selectedElements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, elementStore.selectedElements]);

  const handleSelect = (element: string) => {
    if (tempSelectedElements.includes(element)) {
      setTempSelectedElements(
        tempSelectedElements.filter((el) => el !== element)
      );
    } else if (tempSelectedElements.length < 3) {
      setTempSelectedElements([...tempSelectedElements, element]);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const handleSave = () => {
    elementStore.selectedElements = tempSelectedElements;
    toggleDialog();
  };

  const handleCancel = () => {
    setTempSelectedElements(elementStore.selectedElements);
    toggleDialog();
  };

  const filteredElements = elements.filter((element) => {
    const matchesSearch = element
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const elementNumber = parseInt(element.split(" ")[1]);

    switch (filter) {
      case ">10":
        return matchesSearch && elementNumber > 10;
      case ">50":
        return matchesSearch && elementNumber > 50;
      case ">100":
        return matchesSearch && elementNumber > 100;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="select-items-dialog">
      <button className="dialog-toggle-button" onClick={toggleDialog}>
        Change my choice
      </button>
      {isOpen && (
        <div className="dialog">
          <h2>Select items</h2>
          <input
            className="dialog-search"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="dialog-filter"
            onChange={handleFilterChange}
            value={filter}
          >
            <option value="">No filter</option>
            <option value=">10">Greater than 10</option>
            <option value=">50">Greater than 50</option>
            <option value=">100">Greater than 100</option>
          </select>
          <ul className="dialog-list">
            {filteredElements.map((element, index) => (
              <li key={index} className="dialog-list-item">
                <label className="dialog-list-label">
                  <input
                    type="checkbox"
                    checked={tempSelectedElements.includes(element)}
                    onChange={() => handleSelect(element)}
                    disabled={
                      tempSelectedElements.length >= 3 &&
                      !tempSelectedElements.includes(element)
                    }
                  />
                  <span className="dialog-list-text">{element}</span>
                </label>
                {tempSelectedElements.includes(element) && (
                  <button
                    className="dialog-remove-button"
                    onClick={() => handleSelect(element)}
                  >
                    X
                  </button>
                )}
              </li>
            ))}
          </ul>
          <div className="dialog-actions">
            <button className="dialog-save-button" onClick={handleSave}>
              Save
            </button>
            <button className="dialog-cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default SelectItemsDialog;
