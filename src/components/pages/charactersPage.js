import { Helmet } from "react-helmet";
import CharacterPage from "./characterPage";
import AppBanner from "../appBanner/AppBanner";

const CharactersPage = () => {
  return (
    <>
      <Helmet>
        <title>Marvel Characters | Marvel Information Portal</title>
        <meta
          name="description"
          content="Browse a complete list of Marvel characters with detailed information, biographies, and comics. Learn more about your favorite heroes and villains!"
        />
        <meta
          name="keywords"
          content="Marvel, characters, heroes, villains, Marvel comics, Marvel Universe"
        ></meta>
      </Helmet>

      <AppBanner />
      <CharacterPage />
    </>
  );
};

export default CharactersPage;
