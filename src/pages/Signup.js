import './Signup.css'
import egg from '../assets/images/egg1.png'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { authActions } from '../store/auth-slice'
import LoadingSpinner from '../components/LoadingSpinner'
import {createUserProfile} from '../firebase'

const Signup = () => {

    const [enteredName, setEnteredName] = useState()
    const [enteredEmail, setEnteredEmail] = useState()
    const [enteredPassword, setEnteredPassword] = useState()
    const [entereConfirmPassword, setEnteredConfirmPassword] = useState()
    const [errorValidationMsg, setErrorValidationMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()


    const submitHanlder = (ev) => {
        ev.preventDefault()
        if (!enteredName || !enteredEmail || !enteredPassword) {
            setErrorValidationMsg("All fields are required");
            return
        }

        if (!enteredEmail.includes("@")) {
            setErrorValidationMsg("Invalid e-mail address");
            return
        }
        if (enteredPassword.length < 6) {
            setErrorValidationMsg("Password too short, must be at least 6 digits long");
            return
        }
        if (enteredPassword !== entereConfirmPassword) {
            setErrorValidationMsg("Passwords dont match");
            return
        }



        const user = {
            name: enteredName
        }
setIsLoading(true)
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD12keujud1_qued8M5WaZ6FVZ25qTJU3c", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true
            })
        }).then(response => {
            setIsLoading(false)
            if (response.ok) {
                return response.json()
            } else {
                return response.json().then(data => {
                    let errorMessage = "Register failed"
                    throw new Error(errorMessage)
                })
            }
        }).then(data => {
            createUserProfile(data, user)
            const myToken = data.idToken;
            const myLocalId = data.localId;
            dispatch(authActions.login(myToken))
            dispatch(authActions.localIdIn(myLocalId))
            history.replace('./home')
        }).catch(error => {
            setErrorMsg(error.message)
        })
    }
    return <>
        <div className="formWrapper">
            <div className="validationMsgWrapper">
                <p className="validationMsg">{errorValidationMsg}</p>
                <p className="validationMsg">{errorMsg}</p>
               {isLoading && <LoadingSpinner/>} 
            </div>

            <form>
                <div id="chefname">
                    <label>Your Chef Name</label>
                    <input type="text" onChange={ev => setEnteredName(ev.target.value)} />
                </div>
                <div id="chefemail">
                    <label>Your Chef Email</label>
                    <input type="email" onChange={ev => setEnteredEmail(ev.target.value)} />
                </div>
                <div className="password" id="password">
                    <label>Password</label>
                    <input type="password" onChange={ev => setEnteredPassword(ev.target.value)} />
                </div>
                <div className="password" id="confirmPassword">
                    <label>Confirm Password</label>
                    <input type="password" onChange={ev => setEnteredConfirmPassword(ev.target.value)} />
                </div>
                <button title="Sign Up" className="signUpBtnWrapper" onClick={submitHanlder}>
                    <img id="signUpEggImg" src={egg} alt="" />
                    <p id="signUpBtnTxt"><i className="fas fa-user-plus"></i></p>
                </button>
            </form>
        </div>
    </>;
}

export default Signup;