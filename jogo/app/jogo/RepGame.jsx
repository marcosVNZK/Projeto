"use client";
import { useState, useEffect } from "react";
import "./Styles/StyleRepGame.css";
import Tabuleiro from "./Tabuleiro";

export default function RepGame() {
  const numeroAleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + Math.ceil(min);
  };

  const [player, setPlayer] = useState([numeroAleatorio(11, 47), numeroAleatorio(3, 47)]);
  const [Objetivo, setObjetivo] = useState([numeroAleatorio(19, 47), numeroAleatorio(3, 47)]);
  const [obst, setObst] = useState([]);
  const [lamaCapim, setLamaCapim] = useState([]);
  const [mover, setMover] = useState(0);
  const [ObjetivoEncontrado, setObjetivoEncontrado] = useState(false);
  const [tela, setTela] = useState(true);
  const [personagemCastelo, setPersonagemCastelo] = useState(true);

  useEffect(() => {
    const numObstaculos = 250;
    const obst = Array.from({ length: numObstaculos }, () => [
      numeroAleatorio(12, 47),
      numeroAleatorio(2, 47),
      numeroAleatorio(1, 2),
    ]);
    const posicoesLamaCapim = Array.from({ length: 50 }, () => [
      numeroAleatorio(12, 47),
      numeroAleatorio(2, 47),
      numeroAleatorio(1, 2),
    ]);
    setObst(obst);
    setLamaCapim(posicoesLamaCapim);
  }, []);

  const handleKeyDown = (e) => {
    const obstaculo = obst.find((o) =>
      (e.key === "ArrowUp" && o[0] === player[0] - 1 && o[1] === player[1]) ||
      (e.key === "ArrowDown" && o[0] === player[0] + 1 && o[1] === player[1]) ||
      (e.key === "ArrowLeft" && o[0] === player[0] && o[1] === player[1] - 1) ||
      (e.key === "ArrowRight" && o[0] === player[0] && o[1] === player[1] + 1)
    );

    const positionsArray = [
      player[0] === 10 && (player[1] >= 23 && player[1] <= 26),
      player[0] === 9 && (player[1] >= 23 && player[1] <= 26),
    ];

    if (!ObjetivoEncontrado && positionsArray.includes(personagemCastelo)) {
      window.confirm("Ache o objetivo primeiro! Encontre a Excalibur!");
      setPlayer([numeroAleatorio(11, 47), numeroAleatorio(3, 47)]);
      return;
    }

    if (!obstaculo) {
      switch (e.key) {
        case "ArrowUp":
          if (player[0] >= 2 && !positionsArray.includes(true)) {
            setPlayer([player[0] - 1, player[1]]);
            setMover(mover + 1);
          }
          break;
        case "ArrowDown":
          if (player[0] < 47) {
            setPlayer([player[0] + 1, player[1]]);
            setMover(mover + 1);
          }
          break;
        case "ArrowLeft":
          if (player[1] >= 3) {
            setPlayer([player[0], player[1] - 1]);
            setMover(mover + 1);
          }
          break;
        case "ArrowRight":
          if (player[1] < 47) {
            setPlayer([player[0], player[1] + 1]);
            setMover(mover + 1);
          }
          break;
        default:
          break;
      }
    }

    const castelos = [[3, 24], [3, 25]];
    if (castelos.some(castelo => player[0] === castelo[0] && player[1] === castelo[1])) {
      setPersonagemCastelo(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [player]);

  const reiniciarJogo = () => {
    setPlayer([numeroAleatorio(11, 47), numeroAleatorio(3, 47)]);
    setObjetivo([numeroAleatorio(11, 47), numeroAleatorio(3, 47)]);
    setPersonagemCastelo(true);
    setObjetivoEncontrado(false);
    setMover(0);
  };

  if (player[0] === Objetivo[0] && player[1] === Objetivo[1]) {
    setObjetivoEncontrado(true);
    setObjetivo([null, null]);
  }

  const telaInicial = () => {
    setTela(false);
  };

  return (
    <div className="game">
      {!tela && !personagemCastelo && (
        <div className="final">
          <h1 className="textoFinal1">Parabéns você chegou ao castelo!</h1>
          <h1 className="textoFinal2">Deseja jogar novamente?</h1>
          <button className="reiniciar" onClick={reiniciarJogo}>
            Reiniciar!
          </button>
        </div>
      )}
      {!tela && (
        <div>
          <p className="contagem">Contagem: {mover}</p>
          <Tabuleiro
            jogador={player}
            obj={Objetivo}
            obst={obst}
            reiniciarJogo={reiniciarJogo}
            LamaCapim={lamaCapim}
          />
        </div>
      )}
      {tela && (
        <div className="conteiner">
          <h1 className="tituloJogo">Stuart e o castelo perdido!</h1>
          <button className="linkjogo" onClick={telaInicial}>
            Entrar
          </button>
          <div className="personagem"></div>
        </div>
      )}
    </div>
  );
}
