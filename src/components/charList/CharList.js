import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";
import MarvelService from "../../services/MarvelService";
import "./charList.scss";
import ErrorMessage from "../errorMessage/ErrorMessage";

import { Component } from "react";

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
    offset: 0,
    newItemLoading: false,
    charEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onCharLoading();
    this.updateCharList();
  }

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  onNewItemLoading = () => {
    this.setState({ newItemLoading: true });
  };

  updateCharList = (offset) => {
    this.onNewItemLoading();

    this.marvelService.getAllCharacters(offset).then(this.onCharLoadedList);
  };

  onCharLoadedList = (newChars) => {
    this.setState(({ chars, offset }) => ({
      chars: [...chars, ...newChars],
      loading: false,
      offset: offset + 9,
      newItemLoading: false,
      charEnded: newChars.length < 9,
    }));
  };

  onErrorList = () => {
    this.setState({ loading: false, error: true });
  };

  render() {
    const { onSelectedChar, selectedId } = this.props;

    const { loading, error, chars } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const containt = !(loading || error) ? (
      <ViewList
        charEnded={this.state.charEnded}
        newItemLoading={this.state.newItemLoading}
        offset={this.state.offset}
        updateCharList={this.updateCharList}
        onSelectedChar={onSelectedChar}
        chars={chars}
        selectedId={selectedId}
      />
    ) : null;

    return (
      <>
        {spinner} {errorMessage} {containt}
      </>
    );
  }
}

const ViewList = ({
  charEnded,
  chars,
  onSelectedChar,
  offset,
  newItemLoading,
  updateCharList,
  selectedId,
}) => {
  return (
    <div className="char__list">
      <ul className="char__grid">
        {chars.map((char) => (
          <li
            key={char.id}
            className={`char__item ${
              selectedId && selectedId === char.id ? "char__item_selected" : ""
            }`}
            onClick={() => onSelectedChar(char.id)}
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
        ))}
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
