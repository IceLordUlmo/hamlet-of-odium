import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Encounter.css'
import * as fightActions from '../../store/fights'
import * as attackActions from '../../store/attacks'
import * as mapActions from '../../store/maps'
import { useParams, Redirect } from 'react-router-dom';

const Encounter = () => {
    const dispatch = useDispatch();
    const { encounterId } = useParams();
    const encounters = useSelector((store) => store.maps.encounters)
    const fight = useSelector((store) => store.fights.fight)
    const monsters = useSelector((store) => store.fights.monsters)
    useEffect(() => {
        dispatch(attackActions.loadLearnedAttacksThunk()).then(
            dispatch(mapActions.loadMapThunk())).then(
                dispatch(fightActions.loadFightThunk()))
    }, [dispatch])
    if (Object.values(encounters) == 0) {
        return null
    }
    if (!fight || fight.status == 'no fight') {
        dispatch(fightActions.startFightThunk(encounters[encounterId].fight_monster_id))
        return null
    }
    const attack = async () => {
        const combat = await dispatch(fightActions.dealDamageThunk(1))
        console.log('combat object', combat)
        if (combat.type == 'victory') {
            <Redirect to='/Victory'></Redirect>
        }
        dispatch(fightActions.loadFightThunk())
    }

    return (<div>
        name: {encounters[encounterId].name}
        <p>hp: {fight.monster_hp}</p>
        <p>
            <button onClick={attack}>Whack it for 1 damage</button>
        </p>
    </div>)
}

export default Encounter