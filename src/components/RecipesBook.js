import foodPic from '../assets/images/foodPic.jpg'
import firebase from "../firebase";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import RecipesModal from '../components/RecipesModal'




const RecipesBook = () => {

    const [recipesList, setRecipesList] = useState([])
    const localId = useSelector(state => state.auth.localId)
    const db = firebase.firestore()



const getAllRecipes = () => {
    let recipes = [];
    db.collection('users').doc(localId).collection("recipes").get()
    .then(querysnapshot => {
        querysnapshot.forEach(recipe => {
            let recipe_data = recipe.data();
            console.log("recipe_data ", recipe_data );
            recipe_data.remote_id = recipe.id;
            recipes.push(recipe_data)
        })
        setRecipesList(recipes)
    })
}

// const closeRecipeModal = () => {

// }

console.log("recipesList", recipesList);


    return <div className="book">
        <h6>Recipes book</h6>
        <div className="foodImageWrapper">
            <img src={foodPic} alt="" onClick={()=>getAllRecipes()}/>
        </div>
        <RecipesModal recipesList={recipesList}/>
       
    </div>
}

export default RecipesBook;