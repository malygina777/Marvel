import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import "./charList.scss";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { TransitionGroup, Transition } from "react-transition-group";
import { React, useEffect, useState, useRef } from "react";

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, clearError, getAllCharacters } = useMarvelService();

  useEffect(() => {
    updateCharList();
  }, []);

  const onNewItemLoading = () => {
    setNewItemLoading(true);
  };

  const updateCharList = (offset) => {
    onNewItemLoading();
    clearError();

    getAllCharacters(offset).then(onCharLoadedList);
  };

  const onCharLoadedList = (newChars) => {
    setChars((chars) => {
      return [...chars, ...newChars];
    });

    setOffset((offset) => {
      return offset + 9;
    });
    setNewItemLoading(false);
    setCharEnded(newChars.length < 9);
    if (chars) {
      setFirstLoading(false);
    }
  };

  const { onSelectedChar, selectedId } = props;

  const spinner = loading && firstLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const containt = !error && (
    <ViewList
      charEnded={charEnded}
      newItemLoading={newItemLoading}
      offset={offset}
      updateCharList={updateCharList}
      onSelectedChar={onSelectedChar}
      chars={chars}
      selectedId={selectedId}
    />
  );

  return (
    <>
      {spinner} {errorMessage} {containt}
    </>
  );
};

const ViewList = ({
  charEnded,
  chars,
  onSelectedChar,
  offset,
  newItemLoading,
  updateCharList,
  selectedId,
}) => {
  const defaultStyle = {
    transition: "all 600ms ease-in-out",
  };
  const transitionStyles = {
    entering: { opacity: 0, transform: "translateY(20px)" },
    entered: { opacity: 1, transform: "translateY(0)" },
    exiting: { opacity: 0, transform: "translateY(-20px)" },
    exited: { opacity: 0, transform: "translateY(-20px)" },
  };
  const refs = useRef({});
  if (chars.length === 0) return;
  return (
    <div className="char__list">
      <ul className="char__grid">
        <TransitionGroup component={null}>
          {chars.map((char) => {
            if (!refs.current[char.id]) {
              refs.current[char.id] = { current: null };
            }
            const nodeRef = refs.current[char.id];
            return (
              <Transition
                key={char.id}
                nodeRef={nodeRef}
                timeout={300}
                appear={true}
              >
                {(state) => (
                  <li
                    className={`char__item ${
                      selectedId && selectedId === char.id
                        ? "char__item_selected"
                        : ""
                    }`}
                    onClick={() => onSelectedChar(char.id)}
                    ref={nodeRef}
                    style={{
                      ...defaultStyle,
                      ...transitionStyles[state],
                    }}
                  >
                    <img
                      src={char.thumbnail}
                      alt="abyss"
                      style={{
                        objectFit: char.thumbnail.includes("image_not_availab")
                          ? "fill"
                          : "cover",
                      }}
                    />
                    <div className="char__name">{char.name}</div>
                  </li>
                )}
              </Transition>
            );
          })}
        </TransitionGroup>
      </ul>

      <button
        disabled={newItemLoading}
        className="button button__main button__long"
        onClick={() => updateCharList(offset)}
        style={{ display: charEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onSelectedChar: PropTypes.func,
};

export default CharList;
