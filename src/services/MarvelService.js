import useHttp from "./https.js";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  // const _apiBase = "https://marvel-server-zeta.vercel.app/";
  const _publicKey = "d4eecb0c66dedbfae4eab45d312fc1df";
  const _offsetdefault = 0;

  const getAllCharacters = async (offset = _offsetdefault) => {
    const res = await request(
      `/characters?limit=9&offset=${offset}&apikey=${_publicKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`/characters/${id}?apikey=${_publicKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = _offsetdefault) => {
    const res = await fetch(
      `/comics?limit=8&offset=${offset}&apikey=${_publicKey}`
    );
    const data = await res.json();

    return data.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const res = await request(`/comics/${id}?apikey=${_publicKey}`);

    return _transformComics(res.data.results[0]);
  };

  const getNameChar = async (name) => {
    const res = await request(`/characters?apikey=${_publicKey}`);

    const nameNormalized = name.trim().toLowerCase();
    const character = res.data.results.find(
      (char) => char.name.toLowerCase() === nameNormalized
    );

    return character;
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description",
      pageCount: comics.pageCount
        ? ` ${comics.pageCount} p.`
        : "No information about the number of pages",
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      language: comics.textObjects[0]?.language || "en-us",
      // optional chaining operator
      price: comics.prices[0].price
        ? `${comics.prices[0].price}$`
        : "not available",
    };
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
  return {
    loading,
    request,
    error,
    clearError,
    getAllCharacters,
    getCharacter,
    getComic,
    getAllComics,
    getNameChar,
  };
};

export default useMarvelService;
