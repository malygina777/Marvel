import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner.js";
import { useLocation } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage.js";
import useMarvelService from "../../services/MarvelService.js";
import { Link } from "react-router-dom";
import useFSM from "../utils/useHookMachine.js";

import "./character.scss";

const CharacterPage = () => {
  const { clearError, getNameChar } = useMarvelService();

  const [character, setCharacter] = useState(null);

  const location = useLocation();
  const name = location.state?.valueName;

  const fetchCharacter = (character) => {
    setCharacter(character);
  };

  useEffect(() => {
    clearError();
    if (name) {
      dispatch("FETCH", { fetchCharacter, name });
    }
  }, [name]);

  const trantisions = {
    idle: {
      FETCH: ({ setState, fetchCharacter, name }) => {
        setState("loading");
        getNameChar(name).then((char) => {
          fetchCharacter(char);
          setState("success");
        });
      },
    },
    loading: {
      SUCCESS: ({ setState, setCharacter }, character) => {
        setCharacter(character);
        setState("success");
      },
      ERROR: ({ setState }) => {
        setState("error");
      },
    },
    error: {
      RETRY: ({ setState, fetchCharacter }, data) => {
        setState("loading");
        fetchCharacter(data);
      },
    },
    success: {},
  };

  const [fsmState, dispatch] = useFSM("idle", trantisions);

  const renderFSM = {
    idle: () => <Spinner />,
    loading: () => <Spinner />,
    success: () => <ViewCharacter character={character} />,
    error: () => <ErrorMessage />,
  };

  // const errorMessagePage = error ? <ErrorMessage /> : null;
  // const content =
  //   character && !error && character !== null && !loading ? (
  //     <ViewCharacter character={character} />
  //   ) : null;

  return <>{renderFSM[fsmState]()}</>;
};

const ViewCharacter = ({ character }) => {
  if (!character) return null;
  return (
    <div className="single-comic">
      <img
        src={character.thumbnail.path + "." + character.thumbnail.extension}
        alt={character.name}
        className="single-comic__char-img "
      />
      <div>
        <h2 className="single-comic__name">{character.name}</h2>
        <p className="single-comic__descr">{character.description}</p>
      </div>
      <Link to="/" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default CharacterPage;
