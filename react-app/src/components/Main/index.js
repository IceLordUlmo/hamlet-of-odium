import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../store/session"
import './Main.css'
import { Link } from 'react-router-dom'

const Main = () => {
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch();

    function LogOut(e) {
        e.preventDefault();
        dispatch(logout());
    }

    return (
        <div>
            User : {user.username}
            Health : {user.current_hp} / {user.max_hp}
            <Link to='/items'>Items</Link>
            <button onClick={LogOut}>Log Out</button>
        </div>
    )
}

export default Main