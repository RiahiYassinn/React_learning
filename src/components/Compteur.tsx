import React, { useState } from "react";
import { Button } from "react-bootstrap";

interface Props {
  count: number;
  initialCount: number;
  step: number;
}

function Compteur({ count, step }: Props) {
  const [stateCount, setCount] = useState(0);

  return (
    <div className="container mt-5 text-center">
      <h1>Compteur : {stateCount}</h1>
      <button
        className="btn btn-primary"
        onClick={() => setCount(stateCount + step)}
      >
        + {step}
      </button>
      &nbsp; &nbsp;
      <button
        className="btn btn-primary"
        onClick={() => setCount(stateCount - step)}
      >
        - {step}
      </button>
      &nbsp; &nbsp;
      <button className="btn btn-primary" onClick={() => setCount(0)}>
        reset
      </button>
    </div>
  );
}

export default Compteur;
