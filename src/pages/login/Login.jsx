import React, { useState } from 'react'
import './Login.css'
import assets from '../../assets/assets'
import { signup } from '../../config/firebase'


const Login = () => {

  const [currState, setCurrState] = useState("Sign up")
  const [userName, setUserName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const onSubmitHandler = async (event) => {
  event.preventDefault();

  if (currState === "Sign up") {
    await signup(userName, email, password);
  }
};

  return (
    <div className='login'>

      <img src={assets.logo_big} alt="" className="logo" />

      <form className="login-form">
        <h2>{currState}</h2>

        {currState === "Sign up" && (
          <input onChange={(e)=>setUserName(e.target.value)} value={email}
            type="text"
            placeholder="Username"
            className="form-input"
            required
          />
        )}

        <input
        onChange={}
          type="email"
          placeholder="Email address"
          className="form-input"
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="form-input"
          required
        />

        <button type="submit">
          {currState === "Sign up" ? "Create Account" : "Login"}
        </button>

        {currState === "Sign up" && (
          <div className="login-term">
            <input type="checkbox" required />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>
        )}

        <div className="login-forgot">
          {currState === "Sign up" ? <p className="login-toggle">
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p> : <p className="login-toggle">
              Create a new account?{" "}
              <span onClick={() => setCurrState("Sign up")}>Click here</span>
            </p>
            
         }
        </div>

      </form>

    </div>
  )
}

export default Login