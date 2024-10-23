import { useParams } from "react-router-dom"
import propTypes from 'prop-types';
import Options from "./Options";
import { useState } from "react";
import axios from "axios";


const PlaylistDetail = ({playlists, songs}) => {

   
    const {id} = useParams();
    const currentPlaylist = playlists.filter((p) => p._id === id)

   const [playlist, setPlaylist] = useState(currentPlaylist[0])
   const [selected, setSelected] = useState([]);

    

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.patch(`/api/playlists/modify/${playlist._id}`, selected);
        console.log(data)
    } catch (error) {
        console.error('¡Hubo un error al crear la playlist!', error);
    }
}

const deleteSong = (song) => async (e) => {
    e.preventDefault();
    try {
        await axios.delete(`/api/songs/${song.title}`);
        const updatedSongs = playlist.songs.filter((s) => s.title !== song.title);
        setPlaylist({ ...playlist, songs: updatedSongs });
    } catch (error) {
        console.error('¡Hubo un error al borrar la cancion!', error);
    }
}

    return (
        <form onSubmit={handleSubmit} className="card">
        <h1>{playlist.title}</h1>
        <h2>{playlist.user}</h2>
        <h3>{playlist.genre}</h3>
        {playlist.songs.map((song, index) => (
            <div key={index}>
                <h4>{song.title}</h4>
                <button onClick={deleteSong(song)}>borrar</button>
            </div>
        ))
     }
        <Options setPlaylist={setPlaylist} songs={songs} playlist={playlist} setSelected={setSelected} selected={selected}/>
        <button type="submit">Agregar</button>
        </form>
    )       
}   

PlaylistDetail.propTypes = {
    playlists: propTypes.array,
    songs: propTypes.array,
   
}

export default PlaylistDetail