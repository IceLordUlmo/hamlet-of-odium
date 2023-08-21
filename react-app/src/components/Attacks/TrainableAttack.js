import Cost from '../Cost'
import BuyAttackModal from './BuyAttackModal'
import OpenModalButton from '../OpenModalButton'
import './TrainableAttack.css'

const TrainableAttack = ({ attack, ramen }) => {

    return (
        <div id='trainable-attack'>
            <h2>
                {attack.name}
            </h2>
            <h3>
                Price: <Cost cost={attack.ramen_cost} />
            </h3>
            <h3>
                Damage: {attack.damage}
            </h3>
            <h3 hidden={!(ramen >= attack.ramen_cost)}>
                <OpenModalButton
                    modalComponent={<BuyAttackModal attack={attack} />}
                    className='attack-modal-button'
                    buttonText='Buy' />
            </h3>
        </div>
    )
}

export default TrainableAttack