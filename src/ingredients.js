import parsley from './assets/images/ingredients/parsley.png'
import mushrooms from './assets/images/ingredients/mushrooms.png'
import chilli from './assets/images/ingredients/chili.png'
import piper from './assets/images/ingredients/peper.png'
import salt from './assets/images/ingredients/salt.png'
import tomato from './assets/images/ingredients/tomato.png'
import egg from './assets/images/ingredients/egg.png'
import cheese from './assets/images/ingredients/cheese.png'
import parmezan from './assets/images/ingredients/parmezan.png'
import ham from './assets/images/ingredients/Ham.png'
import bacon from './assets/images/ingredients/bacon.png'
import sausage from './assets/images/ingredients/sausage.png'
import milk from './assets/images/ingredients/milk.png'

export const INGREDIENTS = {
    vegetables:[
      {id:1, title:"tomato", img:tomato, category:"vegetable", metric:"g", step:10, kcal:1.8},
      {id:2, title:"mushrooms", img:mushrooms, category:"vegetable", metric:"g", step:10, kcal:2.2},
      {id:3, title:"chilli", img:chilli, category:"vegetable", metric:"g", step:5, kcal:2},
      {id:4, title:"parsley", img:parsley, category:"vegetable", metric:"g", step:5, kcal:1.8},
      {id:5, title:"pepper", img:piper, category:"vegetable", metric:"g", step:1, kcal:2.25},
      {id:6, title:"salt", img:salt, category:"vegetable" , metric:"g", step:1, kcal:0.1}
    ],
    dairyAndEggs:[
      {id:7, title:"egg", img:egg, category:"dairyAndEggs", metric:"pcs", step:1, kcal:75},
      {id:8, title:"cheese", img:cheese, category:"dairyAndEggs", metric:"g", step:50, kcal:150},
      {id:9, title:"parmezan", img:parmezan, category:"dairyAndEggs", metric:"g", step:10,  kcal:40},
      {id:10, title:"milk", img:milk, category:"dairyAndEggs", metric:"ml", step:10,  kcal:4.2},
    ],
    meat:[
      {id:11, title:"bacon", img:bacon, category:"meat", metric:"g", step:50, kcal:270},
      {id:12, title:"ham", img:ham, category:"meat", metric:"g", step:50, kcal:220},
      {id:13, title:"sausage", img:sausage, category:"meat", metric:"g", step:10, kcal:38}
    ]
  }