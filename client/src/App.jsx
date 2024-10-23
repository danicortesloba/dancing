import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import SongLibrary from './components/SongLibrary'
import PlaylistLibrary from './components/PlaylistLibrary'
import PlaylistDetail from './components/PlaylistDetail'
import NavBar from './components/NavBar'
import { useState, useEffect} from 'react'
import axios from "axios";



function App() {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  
  const fetchSongs = async () => {
      try {
          const { data } = await axios.get('/api/songs');
          setSongs(data)
          setLoading(false)
      } catch (error) {
          console.error('¡Hubo un error al obtener las canciones!', error);
          setSongs([])
      }
      };

      const fetchPlaylists = async () => {
        try {
            const { data } = await axios.get('/api/playlists');
            setPlaylists(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('¡Hubo un error al obtener las playlists!', error);
            setPlaylists([]); 
        }
        };
  
  useEffect(() => {
  fetchSongs();
  fetchPlaylists();
  }, []);

  
    
  

  return (
    <>
  
     <Router>
      <NavBar />

        {loading ? <h1>Cargando...</h1> :
        <Routes>
          <Route path="/" element={<SongLibrary songs={songs} setSongs={setSongs}/>} />
          <Route path="/playlist" element={<PlaylistLibrary songs={songs}  playlists={playlists} setPlaylists={setPlaylists} />} />
          <Route path="/playlist/modify/:id" element={<PlaylistDetail songs={songs} playlists={playlists}  />} />
        </Routes> 
}
      </Router>
      
    </>
  )
}

export default App
