import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../store/session"
import './LeftNav.css'
import { Link } from 'react-router-dom'

const LeftNav = () => {
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch();

    function LogOut(e) {
        e.preventDefault();
        dispatch(logout());
    }

    return (
        <div id='left-nav-container'>
            <p>User : {user.username}</p>
            <p>Health : {user.current_hp} / {user.max_hp}</p>
            <p><Link to='/items'>Items</Link></p>
            <p><Link to='/maps'>Map</Link></p>
            <p><Link to='/attacks'>Attacks</Link></p>
            <button onClick={LogOut}>Log Out</button>
        </div>
    )
}

export default LeftNav