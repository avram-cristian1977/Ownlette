import './Kitchen.css'
import flower from '../assets/images/flower1.png'

import { INGREDIENTS } from '../ingredients'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { workingTableSliceActions } from '../store/workingTable-slice'
import RecipesBook from '../components/RecipesBook'

import Cooking from '../components/Cooking'

const { vegetables } = INGREDIENTS;
const { dairyAndEggs } = INGREDIENTS;
const { meat } = INGREDIENTS;

const Kitchen = () => {
console.log("render kitchen")

  const dispatch = useDispatch()
  const selectedIngredients = useSelector(state => state.workingTable.ingredients)
  const [totalKcal, setTotalKcal] = useState(0)


  useEffect(() => {
    getTotalCalories()

  }, [selectedIngredients])

  const getTotalCalories = () => {
    let kcalSum = 0
    for (let i = 0; i < selectedIngredients.length; i++) {
        setTotalKcal(kcalSum += selectedIngredients[i].kcal * selectedIngredients[i].quantity)
    }
  }







console.log("selected ingred", selectedIngredients);
  return <>

    <div className="cabinet">
      <div className="flowerWrapper">
        <img src={flower} alt="" title="just a flower" />
      </div>
      <RecipesBook/>
    

      {/* sertar 1 */}

      <div id="drawer1">
        <div className="ingredients">
          {vegetables.map(vegetable => {
            return <div key={vegetable.id} className="ingredientBox"
              onClick={() => { dispatch(workingTableSliceActions.addIngredientToWorkingTable(vegetable)) }} >
              <img title={vegetable.title} src={vegetable.img} alt="vegetable" />
              <p className="ingredientsTitle">{vegetable.title}</p>
            </div>
          })}
        </div>
        <p className="ingredientsCategory">Vegetables / Spices</p>
      </div>

      {/* sertar 2 */}

      <div id="drawer2">
        <div className="ingredients">
          {dairyAndEggs.map(dairyEggsitem => {
            return <div key={dairyEggsitem.id} className="ingredientBox"
              onClick={() => dispatch(workingTableSliceActions.addIngredientToWorkingTable(dairyEggsitem))} >
              <img title={dairyEggsitem.title} src={dairyEggsitem.img} alt="vegetable" />
              <p className="ingredientsTitle">{dairyEggsitem.title}</p>
            </div>
          })}
        </div>
        <p className="ingredientsCategory" >Dairy  / Eggs</p>
      </div>

      {/* sertar 3 */}

      <div id="drawer3">
        <div className="ingredients">
          {meat.map(meat => {
            return <div key={meat.id} className="ingredientBox"
              onClick={() => dispatch(workingTableSliceActions.addIngredientToWorkingTable(meat))}>
              <img title={meat.title} src={meat.img} alt="vegetable" />
              <p className="ingredientsTitle">{meat.title}</p>
            </div>
          })}
        </div>
        <p className="ingredientsCategory">Bacon / Ham</p>
      </div>
    </div>

    {/* workingTable */}

    <div className="workingTable">
      <div className="ingredients-table">
        {selectedIngredients.map(ingredient => {
          return <div key={ingredient.id} className="ingredientTableBox" >
            <i title="Reduce quantity" onClick={() => {
              dispatch(workingTableSliceActions.removingIngredientFromWorkingTable(ingredient))
              
              }} className="fas fa-arrow-alt-circle-up" aria-hidden="true"></i>
            <img title={ingredient.title} src={ingredient.img} alt="ingredient" />
            <p className="tableIngredientsTitle">{ingredient.title}</p>
            <p className="tableIngredientsQuantity">{ingredient.quantity * ingredient.step} {ingredient.metric}</p>
          </div>
        })}
      </div>
      <div className="totalKcalWrapper">
        {selectedIngredients.length !== 0 &&
          <div className="blackboard">
            <p>kCal : </p>
            <p>{totalKcal.toFixed(2)}</p>
          </div>}
      </div>
      <Cooking omelette = {selectedIngredients}/>
    </div>
  </>
}

export default Kitchen;