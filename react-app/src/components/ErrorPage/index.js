import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div>
            This is the Error Page.
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
            <Link to='/'>Main</Link>
        </div>
    )
}

export default ErrorPage