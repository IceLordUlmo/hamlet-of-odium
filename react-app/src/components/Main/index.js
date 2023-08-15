import React from 'react';
import { useSelector } from 'react-redux';

const Main = () => {
    const user = useSelector((state) => state.session.user)

    return (
        <div>
            User : {user.username}
            Health : {user.current_hp} / {user.max_hp}
        </div>
    )
}

export default Main