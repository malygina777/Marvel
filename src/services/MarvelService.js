class MarvelService {
  _apiBase = "https://marvel-server-zeta.vercel.app/";
  _publicKey = "d4eecb0c66dedbfae4eab45d312fc1df";
  _offsetdefault = 0;
  getResource = async (url) => {
    try {
      let res = await fetch(url);

      if (!res.ok) {
        console.error(`error${res.status} - ${res.statusText}`);
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      console.error("error dans getResource", error);
      throw error;
    }
  };

  getAllCharacters = async (offset = this._offsetdefault) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=${offset}&apikey=${this._publicKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?apikey=${this._publicKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
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
}

export default MarvelService;
