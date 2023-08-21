import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { useHistory } from "react-router-dom";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory()
  if (sessionUser) return <Redirect to="/maps" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      data[0] = (data[0].split(':'))[1]
      if (data[1]) {
        data[1] = (data[1].split(':'))[1]
      }
      setErrors(data);
    }
  };

  function LogInDemo() {
    const demoUserInfo = {
      email: 'demo@aa.io',
      password: 'password'
    }
    dispatch(login(demoUserInfo.email, demoUserInfo.password)).then(history.push('/maps'));
  }

  function SignUp() {
    history.push("/signup")
  }

  return (
    <div id='login-wrapper'>
      <div>
        <div id='login-container'>
          <h1>Hamlet of Odium</h1>
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li id='error' key={idx}>{error}</li>
              ))}
            </ul>
            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <div id='login-button'>
              <button id='login-button' type="submit">Log In</button>
            </div>
          </form>



        </div>
        <div id='login-buttons'>
          <button id='login-buttons' onClick={SignUp}>Sign Up</button>

          <button id='login-buttons' onClick={LogInDemo}>Log In Demo User</button>

        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
