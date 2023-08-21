import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Attacks.css'
import * as attackActions from '../../store/attacks'

import TrainableAttack from './TrainableAttack'
import LearnedAttack from './LearnedAttack'

const Attacks = () => {
    const user = useSelector((state) => state.session.user)
    const trainableAttacks = useSelector((state) => state.attacks.trainable)
    const learnedAttacks = useSelector((state) => state.attacks.learned)
    const dispatch = useDispatch();

    let trainableList = Object.values(trainableAttacks)
    let learnedList = Object.values(learnedAttacks)

    console.log('learnedList', learnedList)

    useEffect(() => {
        dispatch(attackActions.loadTrainableAttacksThunk())
        dispatch(attackActions.loadLearnedAttacksThunk())
    }, [dispatch])

    return (
        <div>
            <h2>Attacks To Learn:</h2>
            <p>
                {trainableList.map(attack => <TrainableAttack key={attack.id} attack={attack} ramen={user.ramen} />)}
            </p>
            <h2>Attacks You Know:</h2>
            <p>
                {learnedList.map(userAttack => <LearnedAttack key={userAttack.id} userAttack={userAttack} />)}
            </p>
        </div>
    )
}

export default Attacks