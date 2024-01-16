import React ,{Fragment,useState} from 'react'
import {Link} from "react-router-dom"
import {toast} from "react-toastify"
import { FaUser,FaLock } from "react-icons/fa";
const Login = ({setAuth}) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = (e) =>
  setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token",parseRes.token)
      
        setAuth(true);
        toast.success("Logged in Successfully");
      }
      else{
        setAuth(false)
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <main className='dorm-signin'>
      <form onSubmit={onSubmitForm} className='input-form'>
      <h1 className="h3 mb-3 fw-normal">Login</h1>
      <div className="form-floating">
        <input
            type="text"
            name="email"
            value={email}
            placeholder="email"
            onChange={e => onChange(e)}
            className="form-control "
          />
          <label htmlFor="email">Email</label>
      </div>
       <br/>
       <div  className="form-floating">
          <input
              type="password"
              name="password"
              value={password}
              placeholder="password"
              onChange={e => onChange(e)}
              className="form-control"
            />
          <label htmlFor="floatingPassword">Password</label>
       </div>
        <br />
        <button className="w-100 btn btn-lg btn-primary" type='submit'>Sign in</button>
        <div className='register-link'>
          <p>Dont have an account? <Link to="/register">Register</Link></p>
        </div>
        
      </form>
      </main>
      
      
    </Fragment>
  )
}

export default Login;