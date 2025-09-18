import { Helmet } from "react-helmet";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../../resources/img/vision.png";
import CharForm from "../charSearchForm/charSearchForm";

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onSelectedChar = (id) => {
    setSelectedChar(id);
  };
  return (
    <>
      <Helmet>
        <title>Marvel Portal | Discover Heroes, Villains & Comics</title>
        <meta
          name="description"
          content="Welcome to the Marvel Information Portal! Discover your favorite heroes, villains, and comic book stories. Explore the Marvel Universe with us."
        />
        <meta
          name="keywords"
          content="Marvel, Marvel Portal, heroes, villains, comics, Marvel Universe, superheroes"
        />
      </Helmet>
      <RandomChar />
      <div className="char__content">
        <CharList onSelectedChar={onSelectedChar} selectedId={selectedChar} />
        <div>
          <ErrorBoundary>
            <CharInfo selectedChar={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharForm />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
