import "./comicsList.scss";
import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";

const ComicsList = () => {
  const { loading, error, clearError, getAllComics } = useMarvelService();
  const [charsComics, setCharsComics] = useState([]);
  const [offset, setOffset] = useState(0);
  const [disabledButton, setDisabledButton] = useState(false);
  const [comicsEnd, setComicsEnd] = useState(false);

  useEffect(() => {
    updateComics();
  }, []);

  const updateComics = () => {
    clearError();
    setDisabledButton(true);
    getAllComics(offset).then(charLoadedComics);
  };

  const charLoadedComics = (newComics) => {
    if (newComics.length < 8) {
      setComicsEnd(true);
    }
    setCharsComics((charsComics) => {
      return [...charsComics, ...newComics];
    });
    setOffset((offset) => {
      return offset + 8;
    });
    setDisabledButton(false);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const containt = !error ? (
    <ViewComics
      disabledButton={disabledButton}
      charsComics={charsComics}
      updateComics={updateComics}
      comicsEnd={comicsEnd}
    />
  ) : null;

  return (
    <>
      {errorMessage} {spinner} {containt}
    </>
  );
};

const ViewComics = ({
  disabledButton,
  charsComics,
  updateComics,
  comicsEnd,
}) => {
  if (!charsComics.length) return null;
  return (
    <div className="comics__list">
      <ul className="comics__grid">
        {charsComics.map((comics) => {
          return (
            <li key={comics.id} className="comics__item">
              <Link to={`/comics/${comics.id}`}>
                <img
                  src={comics.thumbnail}
                  alt="ultimate war"
                  className="comics__item-img"
                />
                <div className="comics__item-name">{comics.title}</div>
                <div className="comics__item-price">{comics.price}</div>
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        disabled={disabledButton}
        onClick={updateComics}
        className="button button__main button__long"
        style={{ display: comicsEnd ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
