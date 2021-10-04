
import Baking from '../components/Baking'
import { useEffect, useState } from 'react'


const Cooking = ({ omelette }) => {

    const [currentRecipe, setCurrentRecipe] = useState([]);

    const [meatMixtureAlert, setMeatMixtureAlert] = useState("")
    const [vegetableMixtureAlert, setVegetableMixtureAlert] = useState("")

    const [tomatoVerdict, setTomatoVerdict] = useState("");
    const [mushroomsVerdict, setMushroomsVerdict] = useState("");
    const [chilliVerdict, setChiliVerdict] = useState("");
    const [parsleyVerdict, setParsleyVerdict] = useState("");
    const [pepperVerdict, setPepperVerdict] = useState("");
    const [saltVerdict, setSaltVerdict] = useState("");


    const [cheeseVerdict, setCheeseVerdict] = useState("");
    const [parmezanVerdict, setParmezanVerdict] = useState("");
    const [milkVerdict, setMilkVerdict] = useState("");

    const [baconVerdict, setBaconVerdict] = useState("");
    const [hamVerdict, setHamVerdict] = useState("");
    const [sausageVerdict, setSausageVerdict] = useState("");






    useEffect(() => {
        omeletteRecipe()
    }, [omelette])



    const omeletteRecipe = () => {
        let omeletteIngredients = "You used : "
        let omeletteMsg = [];
        let hasEggs = false;
        let meatIngredientTypeCouner = 0;
        let vegetableIngredientTypeCouner = 0;
        let hasSpices = false;
        let hasVegetableFlavour = false;
        let isFluffy = false;
        let tomatoQty, mushroomsQty, chilliQty, parsleyQty, pepperQty, saltQty, eggQty, cheeseQty, parmezanQty, milkQty, baconQty, hamQty, sausageQty;
        tomatoQty = mushroomsQty = chilliQty = parsleyQty = pepperQty = saltQty = eggQty = cheeseQty = parmezanQty = milkQty = baconQty = hamQty = sausageQty = 0;

        for (let i = 0; i < omelette.length; i++) {
            //switch refactoring
            if (omelette[i].title === "tomato") {
                tomatoQty = omelette[i].quantity;
                vegetableIngredientTypeCouner++;
            }

            if (omelette[i].title === "mushrooms") {
                mushroomsQty = omelette[i].quantity
                vegetableIngredientTypeCouner++;
            }





            if (omelette[i].title === "chilli") chilliQty = omelette[i].quantity
            if (omelette[i].title === "parsley") parsleyQty = omelette[i].quantity
            if (omelette[i].title === "pepper") pepperQty = omelette[i].quantity
            if (omelette[i].title === "salt") saltQty = omelette[i].quantity
            if (omelette[i].title === "egg") eggQty = omelette[i].quantity
            if (omelette[i].title === "cheese") cheeseQty = omelette[i].quantity
            if (omelette[i].title === "parmezan") parmezanQty = omelette[i].quantity
            if (omelette[i].title === "milk") milkQty = omelette[i].quantity
            if (omelette[i].title === "bacon") baconQty = omelette[i].quantity
            if (omelette[i].title === "ham") hamQty = omelette[i].quantity
            if (omelette[i].title === "sausage") sausageQty = omelette[i].quantity
            if (omelette[i].category === "meat") meatIngredientTypeCouner++
            if (omelette[i].title === "egg") hasEggs = true
            if (omelette[i].title === "milk") isFluffy = true
            if (
                omelette[i].title === "salt" ||
                omelette[i].title === "pepper" ||
                omelette[i].title === "chilly"
            ) {
                hasSpices = true
            }
            if (
                omelette[i].title === "mushrooms" ||
                omelette[i].title === "parsley" ||
                omelette[i].title === "tomato"
            ) {
                hasVegetableFlavour = true
            }



            setCurrentRecipe([...currentRecipe, {
                title: omelette[i].title,
                quantity: omelette[i].quantity * omelette[i].step,
                metric: omelette[i].metric

            }])

        }

        if (meatIngredientTypeCouner > 1) {
            setMeatMixtureAlert("more then 1 type of meat can mess up the taste");
        }

        if (vegetableIngredientTypeCouner > 1) {
            setVegetableMixtureAlert("more then 1 type of vegetable can ruin the flavor");
        }


        // 1. eggs / tomato ratio management

        if (isFinite(eggQty / tomatoQty)) {
            if ((eggQty / tomatoQty) > 0.34) setTomatoVerdict("balanced eggs - tomato taste")
            if ((eggQty / tomatoQty) < 0.34) setTomatoVerdict("very tomatoish taste")
        }

        // 2. eggs / mushrooms ratio management

        if (isFinite(eggQty / mushroomsQty)) {
            if ((eggQty / mushroomsQty) > 0.31) setMushroomsVerdict("good eggs - mushrooms ratio")
            if ((eggQty / mushroomsQty) < 0.31) setMushroomsVerdict("too many mushrooms!")
        }

        // 3. eggs / chilli ratio management

        if (isFinite(eggQty / chilliQty)) {
            if ((eggQty / chilliQty) === 1) setChiliVerdict("ideal eggs - chili measurement")
            if ((eggQty / chilliQty) < 1) setChiliVerdict("is it chillimania in here???")
        }

        // 4. eggs / parsley ratio management

        if (isFinite(eggQty / parsleyQty)) {
            console.log("eggQty / parsleyQty", eggQty / parsleyQty);
            if ((eggQty / parsleyQty) >= 1) setParsleyVerdict("I wouldnt mind a freshy greeny taste");
            if ((eggQty / parsleyQty) >= 0.5 && ((eggQty / parsleyQty) < 0.67)) setParsleyVerdict("pleasant eggs - parsley taste ");
            if ((eggQty / parsleyQty) < 0.49) setParsleyVerdict("someone is getting veggy...");
        }

        if (!isFinite(eggQty / parsleyQty)) {
            console.log("eggQty / parsleyQty !isFinite", eggQty / parsleyQty);
            if ((eggQty / parsleyQty) >= 1) setParsleyVerdict("I wouldnt mind a freshy greeny taste");
        }

        // 5. eggs / pepper ratio management

        if (isFinite(eggQty / pepperQty)) {
            console.log("eggQty / pepperQty", eggQty / pepperQty);
            if ((eggQty / pepperQty) > 0.75 && (eggQty / pepperQty) < 1.3) setPepperVerdict("nice pepper ratio");
            if (1.27 < (eggQty / pepperQty)) setPepperVerdict("where is the pepper?");
            if ((eggQty / pepperQty) < 0.75) setPepperVerdict("too hot! pepper-off!");

        }

        // 6. eggs / salt ratio management

        if (isFinite(eggQty / saltQty)) {
            console.log("eggQty / saltQty", eggQty / saltQty);
            if ((eggQty / saltQty) > 0.75 && (eggQty / saltQty) < 1.3) setSaltVerdict("salty enough");
            if (1.27 < (eggQty / saltQty)) setSaltVerdict("forgot the salt?");
            if ((eggQty / saltQty) < 0.75) setSaltVerdict("so very salty!!!");

        }

        // 8. eggs / cheese ratio management

        if (isFinite(eggQty / cheeseQty)) {
            console.log("eggQty / cheeseQty", eggQty / cheeseQty);
            if ((eggQty / cheeseQty) > 0.65 && (eggQty / cheeseQty) < 1.67) setCheeseVerdict("fair cheese aproach");
            if (1.68 < (eggQty / cheeseQty)) setCheeseVerdict("more cheese maybe?");
            if ((eggQty / cheeseQty) < 0.64) setCheeseVerdict("very cheese!!!");

        }

        // 9. eggs / parmezan ratio management

        if (isFinite(eggQty / parmezanQty)) {
            console.log("eggQty / parmezanQty", eggQty / parmezanQty);
            if ((eggQty / parmezanQty) > 0.65 && (eggQty / parmezanQty) < 1.67) setParmezanVerdict("uniform parmezan");
            if (1.68 < (eggQty / parmezanQty)) setParmezanVerdict("not a parme-fan?");
            if ((eggQty / parmezanQty) < 0.51) setParmezanVerdict("parme-zen?!!!");

        }


        // 10. eggs / milk ratio management

        if (isFinite(eggQty / milkQty)) {
            console.log("eggQty / milkQty", eggQty / milkQty);
            if ((eggQty / milkQty) > 0.81 && (eggQty / milkQty) < 1.3) setMilkVerdict("great fluffy texture");
            if (1.31 < (eggQty / milkQty)) setMilkVerdict("I would loved a fluffier texture")
            if ((eggQty / milkQty) <= 0.8) setMilkVerdict("is it a milky party?!");

        }



        // 11. eggs / bacon ratio management

        if (isFinite(eggQty / baconQty)) {
            console.log("eggQty / baconQty", eggQty / baconQty);
            if ((eggQty / baconQty) > 0.79 && (eggQty / baconQty) < 1.26) setBaconVerdict("just eggs-bacon ratio ");
            if (1.27 < (eggQty / baconQty)) setBaconVerdict("not enough beacon");
            if ((eggQty / baconQty) < 0.79) setBaconVerdict("very meaty taste");
        }

        // 12. eggs / ham ratio management

        if (isFinite(eggQty / hamQty)) {
            console.log("eggQty / hamQty", eggQty / hamQty);
            if ((eggQty / hamQty) > 0.79 && (eggQty / hamQty) < 1.26) setHamVerdict("good eggs - ham proportion");
            if (1.27 < (eggQty / hamQty)) setHamVerdict("not enough ham flavor");
            if ((eggQty / hamQty) < 0.79) setHamVerdict("very meaty taste");
        }

        // 13. eggs / sausage ratio management

        if (isFinite(eggQty / sausageQty)) {
            console.log("eggQty / sausageQty", eggQty / sausageQty);
            if ((eggQty / sausageQty) > 0.158 && (eggQty / sausageQty) < 0.252) setSausageVerdict("stable eggs-sausage taste ");
            if (0.253 < (eggQty / sausageQty)) setSausageVerdict("not enough sausages");
            if ((eggQty / sausageQty) < 0.159) setSausageVerdict("very meaty taste");
        }



        return omeletteIngredients
    }

    return <div>
        <Baking
            omelette={omelette}
            meatMixtureAlert={meatMixtureAlert}
            vegetableMixtureAlert={vegetableMixtureAlert}
            tomatoVerdict={tomatoVerdict}
            mushroomsVerdict={mushroomsVerdict}
            chilliVerdict={chilliVerdict}
            parsleyVerdict={parsleyVerdict}
            pepperVerdict={pepperVerdict}
            saltVerdict={saltVerdict}
            cheeseVerdict={cheeseVerdict}
            parmezanVerdict={parmezanVerdict}
            milkVerdict={milkVerdict}
            baconVerdict={baconVerdict}
            hamVerdict={hamVerdict}
            sausageVerdict={sausageVerdict}
        />
   
    </div>;
}

export default Cooking;