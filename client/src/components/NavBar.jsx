import { Link } from "react-router-dom";
const NavBar = () => {
    return (
        <div className="navbar">
            <Link to="/"><h1>Biblioteca de Canciones</h1></Link>
            <Link to="/playlist"><h1>Biblioteca de Playlist</h1></Link>
        </div>
    )
}

export default NavBar