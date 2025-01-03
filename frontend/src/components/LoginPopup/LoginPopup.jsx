import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/ContextStore'
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {

    const {url, setToken} = useContext(StoreContext); 
    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandle = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data,[name]:value}));
    }

    const onSubmitLogin = async(event) => {
        event.preventDefault();
        let newUrl = url;
        if(currState==="Login"){
            newUrl += "/api/user/login";
        }else{
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl, data);

        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        }else{
            alert(response.data.message)
        }
        
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onSubmitLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input onChange={onChangeHandle} name='name' value={data.name} type="text" placeholder='Your name' required />}
                    <input onChange={onChangeHandle} name='email' value={data.email} type="email" placeholder='Your email' required />
                    <input onChange={onChangeHandle} name='password' value={data.password} type="password" placeholder='Your password' required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Sign Up" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {
                    currState === "Login"
                        ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>SignUp here</span></p>
                        : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
