import "./Baking.css"
import { useState, useEffect } from "react";
import FireAnimation from './FireAnimation'
import firebase from '../firebase'
import {useSelector} from 'react-redux'

const db = firebase.firestore()



const Baking = ({
    omelette,
    meatMixtureAlert,
    vegetableMixtureAlert,
    tomatoVerdict,
    mushroomsVerdict,
    chilliVerdict,
    parsleyVerdict,
    pepperVerdict,
    saltVerdict,
    cheeseVerdict,
    parmezanVerdict,
    milkVerdict,
    baconVerdict,
    hamVerdict,
    sausageVerdict
}) => {


    const [time, setTime] = useState(0)
    const [timerON, setTimerON] = useState(false)
    const [btnSTOPpressed, setBtnSTOPPressed] = useState(false)
    const [btnRESETpressed, setBtnRESETPressed] = useState(false)
    const [recipeTitle, setRecipeTitle] = useState("")
    const [bakingMessage, setBakingMessage] = useState("")
    const localId = useSelector(state => state.auth.localId)

    useEffect(() => {
        let interval = null;
        if (timerON) {
            interval = setInterval(() => {
                setTime(prev => prev + 1000)
            }, 100);
        } else {
            console.log("time is:", ("0" + Math.floor(time / 60000) % 60).slice(-2), ("0" + Math.floor(time / 1000) % 60).slice(-2), ("0" + (time / 10) % 100).slice(-2));
            clearInterval(interval)
        }
        return () => {
            clearInterval(interval)
        }
    }, [timerON])


    const saveToTheRecipeBook = () => {
        const recipeRef = db.collection('users').doc(localId).collection('recipes').doc()
        const ingredientsToBeSaved = []
        for (let i = 0; i < omelette.length; i++) {
            ingredientsToBeSaved.push({
                title: omelette[i].title,
                quantity: omelette[i].quantity * omelette[i].step,
                metric: omelette[i].metric
            })
        }
        const recipeToBeSaved = {
            id: Date.now(),
            ingredients: ingredientsToBeSaved,
            cookingTime: `m : ${(Math.floor(time / 60000) % 60)}  s : ${(Math.floor(time / 1000) % 60)}`,
            recipeTitle: recipeTitle
        }
      

        recipeRef.set({
            recipeToBeSaved
        })


        console.log("recipeToBeSaved", recipeToBeSaved)
    }

    const startTimerHandler = () => {
        setBakingMessage("");
        if(!omelette.length){
            setBakingMessage("nothing to bake");
            return
        }
        for(let i = 0 ; i < omelette.length ; i++){
            setBakingMessage("");
            console.log("for  fired");
            console.log("omelette[i].title", omelette[i].title);

            if(omelette[i].title === "egg"){
                setBakingMessage("");
                setTimerON(true)
                return

            } else  {
                setBakingMessage("no eggs omelette?");

            }
           
                
            
        }

    }



    console.log("timeee", time);
    console.log("localId din baking", localId);

    return <>
    {bakingMessage && <div className="bakingMessageWrapper">
        <p>{bakingMessage}</p>
        </div>}
        {btnSTOPpressed && !btnRESETpressed &&
            <div className="tableRecipe">
                <div>
                    <div className="recipeTitle">
                        <label>Give it a title</label>
                        <input type="text" onChange={(ev) => setRecipeTitle(ev.target.value)} />
                    </div>
                    {omelette.map(ingredient => {
                        return <p>{ingredient.title} <span>{ingredient.quantity * ingredient.step}</span><span>{ingredient.metric}</span></p>
                    })}
                </div>
                <div className="cookingTime">
                    <span>baking time:</span>
                    <span>
                        <span>{("0" + Math.floor(time / 60000) % 60).slice(-2)}:</span>
                        <span>{("0" + Math.floor(time / 1000) % 60).slice(-2)}:</span>
                        <span>{("0" + (time / 10) % 100).slice(-2)}</span>
                    </span>
                </div>
                <button id="saveToTheRecipeBookBtn" title="Write it to the recipe book" onClick={() => saveToTheRecipeBook()}><i className="fas fa-check"></i></button>
            </div>
        }
        {btnSTOPpressed && <div className="conclusions">
            <h3>Conclusions:</h3>
            {time < 50000 && <h4>Row, almost crude omellete. Baking time too short.</h4>}
            {((time > 50000) && (time < 120000)) && <h4>Good baking time.</h4>}
            {time > 120000 && <h4>Overcooked. Decreese backing time!</h4>}
            {meatMixtureAlert && <p>{meatMixtureAlert}</p>}
            {vegetableMixtureAlert && <p>{vegetableMixtureAlert}</p>}
            {tomatoVerdict && <p>{tomatoVerdict}</p>}
            {mushroomsVerdict && <p>{mushroomsVerdict}</p>}
            {chilliVerdict && <p>{chilliVerdict}</p>}
            {parsleyVerdict && <p>{parsleyVerdict}</p>}
            {pepperVerdict && <p>{pepperVerdict}</p>}
            {saltVerdict && <p>{saltVerdict}</p>}
            {cheeseVerdict && <p>{cheeseVerdict}</p>}
            {parmezanVerdict && <p>{parmezanVerdict}</p>}
            {milkVerdict && <p>{milkVerdict}</p>}
            {baconVerdict && <p>{baconVerdict}</p>}
            {hamVerdict && <p>{hamVerdict}</p>}
            {sausageVerdict && <p>{sausageVerdict}</p>}
        </div>}

        <div className="bakingContainer">
            {(timerON && time < 180000) && <FireAnimation />}

            {time < 180000 ? <div className="timerWrapper">
                <span>{("0" + Math.floor(time / 60000) % 60).slice(-2)}:</span>
                <span>{("0" + Math.floor(time / 1000) % 60).slice(-2)}:</span>
                <span>{("0" + (time / 10) % 100).slice(-2)}</span>
            </div> : <h1 style={{ color: "red" }}>Burned!</h1>}

            <div>
                {!timerON && <button className="startStopBtn" onClick={startTimerHandler}>Start</button>}
                {timerON && <button className="startStopBtn" onClick={() => {
                    setTimerON(false)
                    setBtnSTOPPressed(true)
                }}>Stop</button>}
                {!timerON && <button className="resetBtn" onClick={() => {
                    setBtnRESETPressed(true)
                    setTime(0)
                }
                }>Reset</button>}
            </div>


        </div>

    </>;
}

export default Baking;