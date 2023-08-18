// imports
import { refresh } from './session'
// action types
const GET_FIGHT = 'odium/fights/GET_FIGHT'
const GET_MONSTERS = 'odium/fights/GET_MONSTER'
const DEAL_DAMAGE = 'odium/fights/DEAL_DAMAGE'
const DELETE_FIGHT = 'odium/fights/DELETE_FIGHT'
const MONSTER_DEFEATED = 'odium/fights/DEFEATED'

// action creators
const loadFightAction = (fight) => {
    return {
        type: GET_FIGHT,
        fight
    }
}

const loadMonstersAction = (monsters) => {
    return {
        type: GET_MONSTERS,
        monsters
    }
}

export const monsterDefeatedAction = () => {
    return {
        type: MONSTER_DEFEATED
    }
}

const dealDamageAction = (damage) => {
    return {
        type: DEAL_DAMAGE,
        damage
    }
}
// thunk creators
export const startFightThunk = (monsterId) => async (dispatch) => {
    const res = await fetch(`/api/fight/start/${monsterId}`, {
        headers: {
            method: "GET",
            "Content-Type": "application/json",
        }
    });
    const fight = await res.json()
    return dispatch(loadFightAction(fight))
}

export const loadFightThunk = () => async (dispatch) => {
    const res = await fetch('/api/fight', {
        headers: {
            method: "GET",
            "Content-Type": "application/json",
        }
    });
    const fight = await res.json();
    return dispatch(loadFightAction(fight));
}

export const loadMonstersThunk = () => async (dispatch) => {
    const res = await fetch('/api/monster', {
        headers: {
            method: "GET",
            "Content-Type": "application/json",
        }
    });
    const monsters = await res.json();
    return dispatch(loadMonstersAction(monsters));
}

export const dealDamageThunk = (damage) => async (dispatch) => {
    const res = await fetch('/api/fight/attack', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            damage: 1
        })
    })
    const data = await res.json();
    console.log('damage thunk data', data)
    dispatch(refresh(data.user_id))
    dispatch(dealDamageAction(damage))
    return data;
}

// initial state
const initialState = { monsters: {}, fight: null, defeated: null };
// reducer

const fightsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_FIGHT:
            newState = { ...state }
            newState.fight = action.fight
            return newState;
        case GET_MONSTERS:
            newState = { ...state }
            newState.monsters = {}
            action.monsters.forEach((monster) => newState.monsters[monster.id] = monster)
            return newState;
        case DEAL_DAMAGE:
            newState = { ...state }
            newState.fight = { ...state.fight }
            newState.fight.monster_hp -= action.damage
            return newState;
        case MONSTER_DEFEATED:
            newState = { monsters: { ...state.monsters }, fight: null }
            newState.defeated = { ...state.fight }
            return newState
        default:
            return state;

    }
}

export default fightsReducer;