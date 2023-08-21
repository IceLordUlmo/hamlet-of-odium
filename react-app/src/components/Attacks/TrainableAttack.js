import Cost from '../Cost'
import BuyAttackModal from './BuyAttackModal'
import OpenModalButton from '../OpenModalButton'

const TrainableAttack = ({ attack, ramen }) => {

    return (
        <div>
            <p>
                Attack name: {attack.name}
            </p>
            <p>
                Price: <Cost cost={attack.ramen_cost} />
            </p>
            <p>
                Damage: {attack.damage}
            </p>
            <p hidden={!(ramen >= attack.ramen_cost)}>
                <OpenModalButton
                    modalComponent={<BuyAttackModal attack={attack} />}
                    className='attack-modal-button'
                    buttonText='Buy' />
            </p>
        </div>
    )
}

export default TrainableAttack