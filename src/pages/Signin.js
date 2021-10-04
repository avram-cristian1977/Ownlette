import egg from '../assets/images/egg1.png'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { useHistory } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner'

const Signin = () => {



    const [eneterdEmail, setEnteredEmail] = useState();
    const [enteredPassword, setEnteredPassword] = useState();
    const [errorValidationMsg, setErrorValidationMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()



const signInhandler = (ev) => {
    ev.preventDefault()
    console.log("sign in");

    if(!eneterdEmail || !enteredPassword){
        setErrorValidationMsg("All fields are required");
        return;
    }

    setIsLoading(true)
    
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD12keujud1_qued8M5WaZ6FVZ25qTJU3c",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            email : eneterdEmail,
            password: enteredPassword,
            returnSecureToken: true
        })
    }).then(response => {
        if(response.ok){
            setIsLoading(false)
            return response.json()
        } else {
            return response.json().then(data => {
                let errorMessage = "Authentication failed";
                throw new Error(errorMessage)
            })
        }
    }).then(data => {
        console.log("the daaaata", data);
        const myToken = data.idToken;
        const myLocalId = data.localId;
        dispatch(authActions.login(myToken))
        dispatch(authActions.localIdIn(myLocalId))
        history.replace('./home')
    }).catch(error => {
        console.log("Error: ", error.message);
    })

   

}





    return <>
        <div className="formWrapper">
        <div className="validationMsgWrapper">
                <p className="validationMsg">{errorValidationMsg}</p>
                <p className="validationMsg">{errorMsg}</p>
                {isLoading && <LoadingSpinner/>}
            </div>
            <form onSubmit={signInhandler}>
                <div id="chefemail">
                    <label>Your Chef Email</label>
                    <input type="email" onChange={(ev) => setEnteredEmail(ev.target.value)} />
                </div>
                <div className="password" id="password">
                    <label>Password</label>
                    <input type="password" onChange={(ev) => setEnteredPassword(ev.target.value)} />
                </div>
                <button title="Sign in" className="signUpBtnWrapper" >
                    <img id="signInEggImg" src={egg} alt="" />
                    <p id="signInBtnTxt"> <i className="fas fa-sign-in-alt"></i></p>
                </button>
            </form>
        </div>
    </>;
}

export default Signin;