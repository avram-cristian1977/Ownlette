import { createSlice } from '@reduxjs/toolkit'

const initialIngredients = []


export const workingTableSlice = createSlice(
    
    {
    name: "workingTable",
    initialState: {
        ingredients: initialIngredients,
        totalKcal:0

    },
    reducers: {
        addIngredientToWorkingTable(state, action) {
         
            const newIngredient = action.payload;
            const existingIngredient = state.ingredients.find(ingredient => ingredient.ingredientId === newIngredient.id)
            
            if (!existingIngredient) {
                state.ingredients.push({
                    ingredientId: newIngredient.id,
                    quantity: 1,
                    title: newIngredient.title,
                    category:newIngredient.category,
                    metric: newIngredient.metric,
                    step: newIngredient.step,
                    kcal : newIngredient.kcal,
                    img: newIngredient.img
                })
               
            } else {
                existingIngredient.quantity++
           
            }
        },
        removingIngredientFromWorkingTable(state, action){
          console.log("fire remove");
            const id = action.payload.ingredientId;
            const existingIngredient = state.ingredients.find(ingredient => ingredient.ingredientId === id)
             //trebuie adus obiectul pt a i momodifica kcal
            if(existingIngredient.quantity === 1){
           
              state.ingredients = state.ingredients.filter(ingredient=> ingredient.ingredientId !== id)
            } else {
                existingIngredient.quantity--
             
            }
        },
        resetWorkingTable(state){
     
            state.ingredients = []
           
        }
    }
    
}

)


export const workingTableSliceActions = workingTableSlice.actions