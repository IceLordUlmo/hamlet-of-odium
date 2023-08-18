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
            The Main now has little purpose
        </div>
    )
}

export default Main