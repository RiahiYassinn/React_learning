import React, { useState } from "react";
interface Props {
  notes: number[];
}
const ListeNote = (notes: Props) => {
  const [note, setNote] = useState(notes.notes);
  const [inputValue, setInputValue] = useState("");
  const handleDelete = (index: number) => {
    const newItems = note.filter((_, i) => i !== index);
    setNote(newItems);
  };

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      const newItems = [...note, Number(inputValue)];
      setNote(newItems);
      setInputValue("");
    }
  };
  return (
    <>
      <div className="container mt-5 text-center">
        <h1>Note :</h1>
        {notes.notes.length === 0 && <p>There are no items in the list</p>}
        <ul>
          {note.map((item, index) => (
            <li className="list-group-item">
              {item}
              &nbsp; &nbsp;
              <button
                className="btn btn-primary"
                onClick={() => {
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
};

export default ListeNote;
