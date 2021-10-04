import egg from '../assets/images/spleashedegg.png'
import pan from '../assets/images/pan.jpg'
import parsley from '../assets/images/parsley.png'
import './Home.css'
import ScrollAnimation from '../components/ScrollAnimation'
import AnimationPump from '../components/AnimationPump'


const Home = () => {
    return <>
        <div className="homeTxtWrapper">
            <p>...and make your ownlette.</p><span><img className="parsley" src={parsley} id="parsley" alt="parsley"/></span>
        </div>
        <div className="eggImgWrapper">
           
            <ScrollAnimation/>

            <img className="pan" src={pan} id="panLeft" alt="pan" />
            <img src={egg} id="eggImg" alt="egg"/>
            <img className="pan" src={pan} id="panRight" alt="pan" />
            <div className="goodlist">
                <p id="h-n">Healthy Nutrition</p>
                <p id="w-c">Weight Control</p>
                <p id="e-s">Better Sight</p>
                <p id="g-c">Good Cholesterol</p>
                <p id="s-h">Stronger Heart</p>
            </div>
        </div>
           
    </>;
}

export default Home;