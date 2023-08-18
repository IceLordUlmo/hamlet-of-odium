import { Link } from 'react-router-dom'
import './ErrorPage.css'

const ErrorPage = () => {
    return (
        <div>
            This is the Error Page. Please accept our most sincere apologies and return home.
            <p><Link to='/'>Home</Link></p>
        </div>
    )
}

export default ErrorPage