import React from 'react';
import '../Style/Header.css'
import { NavLink } from 'react-router-dom';


const Header = () => {

    return (
        <div className="header">
            <div className='logoContainer'>
                <div className='logo'>Search Github...</div>
            </div>

            <div className='linksContainer'>
                <div className='linksContainer12'>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'links aciveLinks' : `links`)}>Home</NavLink>
                    <NavLink to="/saved-profile" className={({ isActive }) => (isActive ? 'links aciveLinks' : `links`)}>Saved Profile</NavLink>
                    <NavLink to="/saved-repository" className={({ isActive }) => (isActive ? 'links aciveLinks' : `links`)}>Saved Repository</NavLink>
                    <NavLink to="/search-history" className={({ isActive }) => (isActive ? 'links aciveLinks' : `links`)}>Search History</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Header;