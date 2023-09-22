import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    // State to hold form values (email and password)
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    
    // Access the React Router's navigate function
    const navigate = useNavigate()
    
    // Configure Axios to include credentials with requests
    axios.defaults.withCredentials = true;

    // State to handle and display login errors
    const [error, setError] = useState('')

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Send a POST request to the server for user login
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            if(res.data.Status === 'Success') {
                // Redirect to the home page upon successful login
                navigate('/');
            } else {
                // Set an error message if login fails
                setError(res.data.Error);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' 
                          onChange={e => setValues({...values, email: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password'
                          onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'> Log in</button>
                    <p>You are agree to our terms and policies</p>
                </form>
            </div>
        </div>
    )
}

export default Login
