import css from "./MovieModal.module.css"
import { useEffect } from "react"
import { createPortal } from "react-dom"
import type { Movie } from "../../types/movie"

interface MovieModalProps{
    movie: Movie;
    onCloset: () => void;
}

const modalA = document.getElementById("modalA") as HTMLElement;

export default function MovieModal({ movie, onCloset }: MovieModalProps) {
    
    useEffect(() => {
        const handlEl = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onCloset();
            }
        };

        document.addEventListener("keydown", handlEl);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handlEl);
            document.body.style.overflow = "auto";
        };
    }, [onCloset]);

    const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onCloset();
        
        }
    };

    return createPortal(
        <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleModalClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onCloset}
        >
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
        </div>,
        modalA,
    )

}