
import { useState } from 'react'
import '../components/recipesModal.css'
import Pagination from '../components/Pagination'

const RecipesModal = ({ recipesList }) => {

    const [modalIsVisible, setModalisVisible] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(1)


    const idxOfLastRecipe = currentPage * recipesPerPage
    const idxOfFirstRecipe = idxOfLastRecipe - recipesPerPage
    const currentRecipes = recipesList.slice(idxOfFirstRecipe, idxOfLastRecipe)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const hideModal = () => {
        setModalisVisible(false)
    }

    return <>{modalIsVisible && recipesList.length > 0 &&
        <div className="recipesModal">
            {currentRecipes.map((recipe, idx) => {
                return <div key={recipe.remote_id}>
                    <h6>{recipe.recipeToBeSaved.recipeTitle}</h6>
                    <p className="bakingTime">Baking time : <div>{recipe.recipeToBeSaved.cookingTime}</div></p>
                    {recipe.recipeToBeSaved.ingredients.map(ingredient => {
                        return <span>
                            <span>{ingredient.cookingTime}</span>
                            <span>{ingredient.title}</span>-<span>{ingredient.quantity}</span><span>{ingredient.metric}, </span></span>
                    })}
                    {/* <span>{recipe.recipeToBeSaved.ingredients[idx].title}</span>
                        <span>{recipe.recipeToBeSaved.ingredients[idx].quantity}</span>
                        <span>{recipe.recipeToBeSaved.ingredients[idx].metric}</span>  */}
                </div>
            })}
            <Pagination recipesPerPage={recipesPerPage} totalRecipes={recipesList.length} paginate={paginate} />
            <button className="closeModalBtn" onClick={() => hideModal()}><i class="fas fa-times-circle"></i></button>
        </div>}

    </>
}

export default RecipesModal;