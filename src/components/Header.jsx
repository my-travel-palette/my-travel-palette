import {NavLink} from  "react-router-dom";

function Header() {

    return (

        <div>
            <NavLink to="/">
            <h2>My Travel Palette</h2>
            </NavLink>
        </div>
    )
}

export default Header