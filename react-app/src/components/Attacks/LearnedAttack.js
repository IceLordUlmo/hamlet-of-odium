import EditAttackModal from './EditAttackModal'
import ForgetAttackModal from './ForgetAttackModal'
import OpenModalButton from '../OpenModalButton'
import './LearnedAttack.css'
const LearnedAttack = ({ userAttack }) => {
    return (

        <div id='learned-attack'>
            <h2>{userAttack.name}</h2>
            <h3>{userAttack.description}</h3>
            <h3>Damage: {userAttack.damage}</h3>
            <div id='learned-buttons-wrapper'>
                <div id='learned-buttons'>
                    <OpenModalButton
                        modalComponent={<EditAttackModal userAttack={userAttack} />}
                        className='attack-modal-button'
                        buttonText='Update' />
                    <OpenModalButton
                        modalComponent={<ForgetAttackModal userAttack={userAttack} />}
                        className='attack-modal-button'
                        buttonText='Forget' />
                </div>
            </div>
        </div>
    )
}

export default LearnedAttack