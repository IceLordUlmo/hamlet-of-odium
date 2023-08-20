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
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
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
        <p>
          <button type="submit">Log In</button>
        </p>
      </form>

      <p>
        <button onClick={LogInDemo}>Log In User 1</button>
      </p>
      <p>
        <button onClick={SignUp}>Go To Sign Up Page</button>
      </p>
    </>
  );
}

export default LoginFormPage;
