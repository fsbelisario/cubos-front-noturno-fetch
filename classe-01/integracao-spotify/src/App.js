import './App.css';
import SongCard from "./components/SongCard";
import getToken from "./components/getToken";
import { useState } from 'react';

function App() {
  const [songSearch, setSongSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const searchSongURL = (songSearch) =>
    `https://api.spotify.com/v1/search?q=${songSearch}&type=track&limit=10`;

  async function submit(e) {
    e.preventDefault(); //Impede ação padrão de recarregar página
    if (!songSearch) return; //Se input estiver vazio ao submeter, interrompe a execução

    setSongs([]);
    setError();
    setLoading(true);

    try {
      const token = await getToken();

      const response = await fetch(searchSongURL(songSearch), {
        headers: { Authorization: token } //Conforme seção 2 de https://developer.spotify.com/documentation/general/guides/authorization-guide/
      });

      const { tracks } = await response.json();
      setSongs(tracks.items);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  return (
    <div>
      <body>
        <h1>Spotify</h1>
        <form onSubmit={submit}>
          <input type="text" value={songSearch} onChange={(e) => setSongSearch(e.target.value)} />
        </form>
      </body>
      {loading && <span>Carregando...</span>}
      {error && <span>{error}</span>}
      {(songs.length === 0 && !loading && !error) && <span>Nenhum resultado encontrado.</span>}
      {songs.map((song) => <SongCard song={song} />)}
    </div>
  );
}

export default App;