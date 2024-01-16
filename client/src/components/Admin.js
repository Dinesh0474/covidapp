import React ,{Fragment,useState,} from 'react'

import {useNavigate}  from 'react-router-dom'


const Admin = ({setAuth}) => {

    const [inputs,setInputs] = useState({
        email:"",
        password:""
    })
    const navigate = useNavigate()

    const {email,password} = inputs;

    const onChange = (e) =>
       setInputs({ ...inputs, [e.target.name]: e.target.value });

    const handleLogin = () => {
        if (email === "admin@gmail.com" && password === "7777") {
          navigate("/admin/"); 
          setAuth(true);
        } else {
          alert("Invalid credentials. Please try again.");
        }
    };

    const handleclick = () => {
        navigate("/login");
    }

  return (
    <Fragment>
      <main className='dorm-signin'></main>

      <form >
      <h1 className="h3 mb-3 fw-normal">Admin Login</h1>
      <div>
      <label htmlFor='email'>Email</label>
        <input
            type="text"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            className="form-control"
          />

      </div>
      <div>
      <label htmlFor='floatingPassword'>Password</label>
      <input
          type="password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
          className="form-control"
        />
      </div>
        <button className="w-100 btn btn-lg btn-primary" onClick={handleLogin} type='submit'>Login</button>
        <br /><br />
        <button className="w-100 btn btn-lg btn-primary" onClick={handleclick} type='submit'>User Login</button>
      </form>

    </Fragment>
  )
}

export default Admin

