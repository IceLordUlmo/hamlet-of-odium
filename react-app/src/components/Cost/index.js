import Ramen from './ramen.png'

function Cost({ cost }) {
    return (
        <a>
            {cost} <img src={Ramen} alt='ramen icon' />
        </a>
    )
}

export default Cost