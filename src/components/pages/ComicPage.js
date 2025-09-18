import { Helmet } from "react-helmet";
import "./singleComic.scss";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";

const ComicPage = () => {
  const { comicId } = useParams();

  const { loading, getComic, error, clearError } = useMarvelService();
  const [comic, setComic] = useState(null);

  useEffect(() => {
    if (comicId) {
      comicUpdet();
    }
  }, [comicId]);

  const comicUpdet = () => {
    clearError();
    getComic(comicId).then(comicLoader);
  };

  const comicLoader = (comic) => {
    setComic(comic);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !loading && !error && comic ? <Comic comic={comic} /> : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const Comic = ({ comic }) => {
  if (!comic) return null;
  return (
    <div className="single-comic">
      <Helmet>
        <title>{comic.title} | Marvel Comics</title>
        <meta
          name="description"
          content={`Read "${comic.title}" — a Marvel comic issue released in ${comic.date}. Learn more about its plot, creators and cover price.`}
        />
        <meta name="keywords" content={`Marvel, comics, ${comic.title}`} />
      </Helmet>
      <img
        src={comic.thumbnail}
        alt={comic.title}
        className="single-comic__img"
      />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{comic.title}</h2>
        <p className="single-comic__descr">{comic.description}</p>
        <p className="single-comic__descr">{comic.pageCount}</p>
        <p className="single-comic__descr">{comic.language}</p>
        <div className="single-comic__price">{comic.price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default ComicPage;
