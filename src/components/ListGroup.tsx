import React, { useState } from "react";
interface Props {
  initialItems: string[];
  heading: string;
  placeholder: string;
  onSelectedItem: (item: string) => void;
}

function ListGroup({
  initialItems,
  heading,
  onSelectedItem,
  placeholder,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [items, setItems] = useState(initialItems);
  const [inputValue, setInputValue] = useState("");

  const handleDelete = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      const newItems = [...items, inputValue];
      setItems(newItems);
      setInputValue("");
    }
  };

  return (
    <>
      <div className="container mt-5 text-center">
        <h1>{heading}</h1>
        {initialItems.length === 0 && <p>There are no items in the list</p>}
        <ul>
          {items.map((item, index) => (
            <li
              className={
                selectedIndex === index
                  ? "list-group-item active"
                  : "list-group-item"
              }
              key={item}
              onClick={() => {
                setSelectedIndex(index);
                onSelectedItem(item);
              }}
            >
              {item}
              &nbsp; &nbsp;
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index);
                }}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          &nbsp; &nbsp;
          <button className="btn btn-primary" onClick={handleAdd}>
            Ajouter
          </button>
        </div>
      </div>
    </>
  );
}

export default ListGroup;
