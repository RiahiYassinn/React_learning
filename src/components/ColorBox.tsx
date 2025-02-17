import React, { useState } from "react";

interface Props {
  initialColor: string;
  colorOptions: string[];
}

const ColorBox: React.FC<Props> = ({ initialColor, colorOptions }) => {
  const [currentColor, setCurrentColor] = useState(initialColor);

  const handleChangeColor = () => {
    const randomIndex = Math.floor(Math.random() * colorOptions.length);
    setCurrentColor(colorOptions[randomIndex]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: currentColor,
          margin: "0 auto",
        }}
      ></div>
      <button onClick={handleChangeColor} className="btn btn-primary mt-3">
        Changer de couleur
      </button>
    </div>
  );
};

export default ColorBox;
