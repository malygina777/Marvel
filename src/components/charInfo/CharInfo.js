import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import "./charInfo.scss";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { loading, error, clearError, getCharacter } = useMarvelService();

  useEffect(() => updateCharInfo(), [props.selectedChar]);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateCharInfo = () => {
    const { selectedChar } = props;
    if (!selectedChar) {
      return;
    }
    clearError();

    getCharacter(selectedChar).then(onCharLoaded);
  };

  const skeleton = char === null && !loading && !error ? <Skeleton /> : null;
  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !loading && !error && char ? <ViewInfo char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {spinner}
      {errorMessage}
      {content}
    </div>
  );
};

const ViewInfo = (props) => {
  if (!props.char) {
    return null;
  }
  const { thumbnail, description, name, homepage, wiki, comics } = props.char;

  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          style={{
            objectFit: thumbnail.includes("image_not_availab")
              ? "contain"
              : "cover",
          }}
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "There is no comics with this character"}
        {comics.map((item, i) => {
          if (i > 9) return;
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  selectedChar: PropTypes.number,
};

export default CharInfo;
