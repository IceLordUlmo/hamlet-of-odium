import Ramen from './ramen.png'
import './Cost.css'

function Cost({ cost }) {
    return (
        <div id='cost'>
            {cost} <img src={Ramen} alt='ramen icon' />
        </div>
    )
}

export default Cost