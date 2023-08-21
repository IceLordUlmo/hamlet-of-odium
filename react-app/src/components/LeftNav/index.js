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
                    <img src={Logo}></img>
                </div>
                <div id='left-nav-content'>
                    <div>
                        <p>User: {user.username}</p>
                        <p>Health: {user.current_hp} / {user.max_hp}</p>
                        <p>Ramen: <Cost cost={user.ramen} /></p>
                        <p>Experience: {user.experience} / 10</p>
                        <p>Level: {user.level}</p>
                        <p><Link to='/items'>Items</Link></p>
                        <p><Link to='/maps'>Map</Link></p>
                        <p><Link to='/attacks'>Attacks</Link></p>
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