"use client";
import { useState } from "react";
import Celula from "./celula";
import "./Styles/StyleTabuleiro.css";

export default function Tabuleiro({ jogador, obj, obst, reiniciarJogo, LamaCapim }) {
  const [celula] = useState(Array.from({ length: 50 }, () => Array(50).fill()));

  return (
    <div className="container">
      {celula.map((linha, i) => (
        <div className="mostralinha" key={i}>
          {linha.map((_, j) => (
            <Celula
              key={`${i}-${j}`} // Unique key for each cell
              coords={[i, j]}
              jogador={jogador}
              objetivo={obj}
              obst={obst}
              reiniciarJogo={reiniciarJogo}
              LamaCapim={LamaCapim}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
