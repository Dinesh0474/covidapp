import React , {Fragment, useState} from 'react'
import {Link} from "react-router-dom"
const Register = ({setAuth}) => {

  const [inputs,setInputs] = useState({
    email:"",
    password:"",
    name:""
  })

  const {email,password ,name} = inputs;


  const onChange = (e) => {
    setInputs({...inputs,[e.target.name]
    : e.target.value})
  }

  const onSubmitForm = async(e) => {
    e.preventDefault()

    try{

      const body = {email,password,name}
      const response = await fetch("http://localhost:5000/auth/register",{
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

      const parseRes = await response.json()

      localStorage.setItem("token",parseRes.token)
      
      setAuth(true)
    } catch(err) {
      console.error(err.message)
    }
  }
  return (
    <Fragment>
        <br /><br /><br />
      <main className=''>
     
      <form onSubmit={onSubmitForm} className='input-form'>
      <h1 className="h3 mb-3 fw-normal">Create Account</h1>
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
      <div className="form-floating">
     
        <input
            type="text"
            name="name"
            value={name}
            placeholder="name"
            onChange={e => onChange(e)}
            className="form-control"
          />
         <label htmlFor="username">Username</label>

      </div>
       
        <button className="w-100 btn btn-lg btn-primary" type='submit'>Register</button>
      </form>
      <Link to="/login">Already have an account?</Link>

      </main>
      
    </Fragment>

    
    
  )
}

export default Register