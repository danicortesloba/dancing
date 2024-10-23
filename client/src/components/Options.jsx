import Multiselect from 'multiselect-react-dropdown';
import { useState, useEffect } from 'react';
import propTypes from 'prop-types';



const Options = ({setPlaylist, songs, playlist,setSelected, selected}) => {

const [options, setOptions] = useState([]);
const [loadedSelection, setLoadedSelection] = useState([]);


    const orderOptions = () => {
        const optionArray = []
    songs.map((song, index) => {
        optionArray.push({name: song.title, id: index})
    })
    setOptions(optionArray)
    }

    const onSelect = (selectedList) => {
        setLoadedSelection(selectedList);
        selectedList.map((canciones, index) => {
            const selectedSongs = songs.filter((song) => song.title === selectedList[index].name);
            setSelected(selectedSongs);
            
        })
        selected.map((song) => {
            
            setPlaylist({
                ...playlist,
                songs: [...playlist.songs, {title: song.title, artist: song.artist, genre: song.genre, year: parseInt(song.year)}],
            });
        });
    }
    
    
    useEffect (() => {
        try {
            orderOptions();
        } catch (error) {
            console.error('¡Hubo un error al obtener las canciones!', error);
        }
    }
    , []);

    return (
        <div>
            <Multiselect
                value={selected}
                className="multiple"
                displayValue="name"
                isObjects={true}
                options={options}
                selectedValues={loadedSelection}
                onSelect={onSelect}
                />
        </div>
    )
}

Options.propTypes = {
    setPlaylist: propTypes.func,
    songs: propTypes.array,
    playlist: propTypes.object,
    setSelected: propTypes.func,
    selected: propTypes.array
}

export default Options
