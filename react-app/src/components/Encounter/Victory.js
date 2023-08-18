import { Link } from "react-router-dom"

const Victory = ({ ramen, experience }) => {
    return (<div>
        <p>Victory</p>
        <p>
            Ramen: {ramen}
        </p>
        <p>
            Experience: {experience}
        </p>
        <Link to='/map'>Back to Map</Link>
    </div>)
}

export default Victory