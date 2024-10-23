import axios from "axios";
import { useState} from "react";
import propTypes from 'prop-types';

const SongLibrary = ({songs, setSongs} ) => {
    const initialSong = {title: '', artist: '', genre: '', year: ''};
    const [song, setSong] = useState(initialSong);


const deleteSong = async (title) => {
    try {
        await axios.delete(`/api/songs/${title}`);
        const updatedSongs = songs.filter((song) => song.title !== title);
        setSongs(updatedSongs);
    } catch (error) {
        console.error('¡Hubo un error al borrar la cancion!', error);
    }
}

const manageChange = (e) => {
    const {name, value} = e.target
    setSong({ ...song, [name]: value })
}

const submitSong = async (e) => {
    e.preventDefault();
    try {
        console.log
        const { data } = await axios.post('/api/songs', song);
        setSongs([...songs, data]);
        setSong(initialSong);
    } catch (error) {
        console.error('¡Hubo un error al crear la cancion!', error);
    }
}

    return (
        <div className="container">
            <div className="library">
                <h1 className="title">Biblioteca de canciones</h1>
                <div className="cards">
                    {songs.map((song, index) => (
                        <div className="card" key={index}>
                            <h2>{song.title}</h2>
                            <h3>{song.artist}</h3>
                            <h4>{song.genre}</h4>
                            <p>{song.year}</p>
                            <button onClick={() => deleteSong(song.title)}>Borrar</button>
                        </div>
                    ))}
                </div>
            </div>
            <form className="form" onSubmit={(e)=>submitSong(e)}>
                <h1>Añadir nueva canción</h1>
                <label htmlFor="title">Título:</label>
                <input className="field" type="text" name="title" id="title" onChange={manageChange} value={song.title} />
                <label htmlFor="artist">Artista:</label>
                <input className="field" type="text" name="artist" id="artist" onChange={manageChange} value={song.artist} />
                <label htmlFor="genere">Género:</label>
                <input className="field" type="text" name="genre" id="genre" onChange={manageChange} value={song.genre} />
                <label htmlFor="year">Año:</label>
                <input className="field" type="number" name="year" id="year" onChange={manageChange} value={song.year} />
                <button className="button" type="submit">Agregar cancion</button>

            </form>
            
        </div>
    )
}

SongLibrary.propTypes = {
    songs: propTypes.array,
    setSongs: propTypes.func
}


export default SongLibrary