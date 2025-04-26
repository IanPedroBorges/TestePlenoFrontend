import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { ResponseLivros } from "../Mocks/livros";
import style from "../styles/home.module.css";

interface Livro {
  ID: number;
  NOME: string;
  AUTOR: string;
  EDITORA: string;
  DATA_PUBLICACAO: string;
  Star: number;
  FL_FAVORITO: boolean;
}

export default function Home() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const res = ResponseLivros();
    if (res.status === 200) setLivros(res.data.lstLivros);
  }, []);

  const handleLogout = () => navigate("/");

  const scroll = (dir: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <div className={style.main}>
      <header className={style.header}>
        <img src={logo} alt="Capys Logo" className={style.logo} />
        <button onClick={handleLogout} className={style.logoutButton}>
          Sair
        </button>
      </header>

      <div className={style.carouselContainer}>
        <button
          onClick={() => scroll("left")}
          className={`${style.navButton} ${style.left}`}
        >
          ‹
        </button>

        <div ref={carouselRef} className={style.grid}>
          {livros.map((l) => (
            <div key={l.ID} className={style.card}>
              <h2 className={style.cardTitle}>{l.NOME}</h2>
              <p className={style.cardMeta}>
                <span className={style.author}>{l.AUTOR}</span> •{" "}
                <span className={style.editor}>{l.EDITORA}</span>
              </p>
              <p className={style.pubDate}>
                {new Date(l.DATA_PUBLICACAO).toLocaleDateString()}
              </p>
              <p className={style.rating}>⭐ {l.Star.toFixed(1)}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className={`${style.navButton} ${style.right}`}
        >
          ›
        </button>
      </div>
    </div>
  );
}
