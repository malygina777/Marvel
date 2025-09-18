import { Helmet } from "react-helmet";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <title>Marvel Comics | Explore the Marvel Universe</title>
        <meta
          name="description"
          content="Discover an extensive library of Marvel comics. Explore stories, characters, and epic battles in the Marvel Universe through detailed comic issues."
        />
        <meta
          name="keywords"
          content="Marvel comics, comic books, Spider-Man, Avengers, Iron Man, Marvel Universe, comic issues"
        />
      </Helmet>
      <AppBanner />
      <ComicsList />
    </>
  );
};

export default ComicsPage;
