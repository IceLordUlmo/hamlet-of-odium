import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Encounter.css'
import * as fightActions from '../../store/fights'
import * as attackActions from '../../store/attacks'
import * as mapActions from '../../store/maps'
import { useParams, useHistory } from 'react-router-dom';

const Encounter = () => {
    const dispatch = useDispatch();
    const { encounterId } = useParams();
    const encounters = useSelector((store) => store.maps.encounters)
    const fight = useSelector((store) => store.fights.fight)
    const monsters = useSelector((store) => store.fights.monsters)
    const history = useHistory()
    let defeatedMonster = useSelector((store) => store.fights.defeated);
    useEffect(() => {
        dispatch(attackActions.loadLearnedAttacksThunk()).then(
            dispatch(mapActions.loadMapThunk())).then(
                dispatch(fightActions.loadMonstersThunk())).then(
                    dispatch(fightActions.loadFightThunk()))
    }, [dispatch])
    const encounterList = Object.values(encounters)
    if (encounterList.length == 0 || fight == null) {
        return null
    }

    const attack = async () => {
        const combat = await dispatch(fightActions.dealDamageThunk(1))
        console.log('combat object', combat)
        if (combat.type == 'victory') {
            defeatedMonster = true;
            dispatch(fightActions.monsterDefeatedAction())
            history.push('/victory')
        }
    }

    if (fight.status == 'no fight') {
        return null
    }
    //redirect to the appropriate encounter if we try to get into it in the wrong place
    if (encounters[encounterId].fight_monster_id != fight.monster_id) {
        const destinationEncounterId = encounterList.filter(encounter => (encounter.fight_monster_id === fight.monster_id))[0].id
        history.push(`/encounters/${destinationEncounterId}`)
    }

    return (<div>
        <h1> {encounters[encounterId].name} </h1>
        <div id='encounter-monster-wrapper'>
            <div id='encounter-monster-text'>
                <h3>You are in combat with a: <p></p>{monsters[fight.monster_id].name}</h3>
                <p>HP: {fight.monster_hp} / {monsters[fight.monster_id].max_hp}</p>
                <p>
                    <button onClick={attack}>Whack it for 1 damage</button>
                </p>
            </div>
        </div>
    </div>)
}

export default Encounter