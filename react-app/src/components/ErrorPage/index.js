import { Link, useHistory } from 'react-router-dom'
import './ErrorPage.css'
import { useSelector } from 'react-redux'

const ErrorPage = () => {
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    if (!user) {
        history.push('/login')
    }
    return (
        <div>
            This is the Error Page. Please accept our most sincere apologies and return home.
            <p><Link to='/'>Home</Link></p>
        </div>
    )
}

export default ErrorPage