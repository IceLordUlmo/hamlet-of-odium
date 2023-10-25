import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../store/session"
import './LeftNav.css'
import { Link } from 'react-router-dom'
import Cost from '../Cost'
import { Redirect, useHistory } from 'react-router-dom';
import Logo from './logo.png'
const LeftNav = () => {
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();
    if (!user) {
        <Redirect to='/login' />
    }
    function LogOut(e) {
        e.preventDefault();
        dispatch(logout());
        history.push('/login')
    }

    return (
        <div id='left-nav-container'>
            <div>
                <div id='left-nav-logo'>
                    <img src={Logo} alt='Hamlet of Odium Logo'></img>
                </div>
                <div id='left-nav-content'>
                    <div>
                        <div id='user-stats'>
                            <p>User: {user.username}</p>
                            <p>Health: {user.current_hp} / {user.max_hp}</p>
                            <p>Ramen: <Cost cost={user.ramen} /></p>
                            <p>Experience: {user.experience} / 10</p>
                            <p>Level: {user.level}</p>
                        </div>
                        <p><Link id='nav-link' to='/maps'>Map</Link></p>
                        <p><Link id='nav-link' to='/items'>Items</Link></p>
                        <p><Link id='nav-link' to='/recipes'>Recipes</Link></p>
                        <p><Link id='nav-link' to='/attacks'>Attacks</Link></p>
                        <p><Link id='nav-link' to='/howtoplay'>How To Play</Link></p>
                    </div>
                </div>
            </div>
            <div id='left-nav-logout'>
                <button onClick={LogOut}>Log Out</button>
            </div>
        </div>
    )
}

export default LeftNav