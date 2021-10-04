import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Kitchen from './pages/Kitchen'
import Signup from './pages/Signup'
import Signin from './pages/Signin'


const App = () => {
  return <>
    <Navigation />
    <Switch>
     <Route path="/" exact>
        <Redirect to="/home"/>
     </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/kitchen/:localId" exact>
        <Kitchen />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
    </Switch>


  </>
}

export default App;
