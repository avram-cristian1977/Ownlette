import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import './Navigation.css'
import { useState, useEffect } from "react";
import { workingTableSliceActions } from "../store/workingTable-slice";

const Navigation = () => {

    const token = useSelector(state => state.auth.token)
    const localId = useSelector(state => state.auth.localId)
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const db = firebase.firestore()

    useEffect(() => {
        getUserNameHandler()
    }, [localId])

    const getUserNameHandler = () => {
        if (!localId) {
            return
        }

        db.collection("users").doc(localId).get().then(doc => {
            setName(doc.data().name)
        })
    }
    return <>
        <nav>
            <ul >
                <li>
                    <div className="menuItemandIcon">
                        <NavLink activeClassName="activeLink" to="/home">
                            <span>Home</span>
                            <i className="fas fa-house-user"></i>
                        </NavLink>
                    </div>
                </li>
                <li>
                    <div className="menuItemandIcon">
                        <NavLink activeClassName="activeLink" to="/contact">
                            <span>Contact</span>
                            <i className="fas fa-address-book"></i>
                        </NavLink>
                    </div>
                </li>
                {token &&
                    <li>
                        <div className="menuItemandIcon">
                            <NavLink activeClassName="activeLink" to={`/kitchen/${localId}`}>
                                <span>Kitchen</span>
                                <i className="fas fa-utensils"></i>
                            </NavLink>
                        </div>
                    </li>
                }

                {!token && <> <li>
                    <div className="menuItemandIcon">
                        <NavLink activeClassName="activeLink" to="/signup">
                            <span>Sign up</span>
                            <i className="fas fa-user-plus"></i>
                        </NavLink>
                    </div>
                </li>
                    <li>
                        <div className="menuItemandIcon">
                            <NavLink activeClassName="activeLink" to="/signin">
                                <span>Sign in</span>
                                <i className="fas fa-sign-in-alt"></i>
                            </NavLink>
                        </div>
                    </li>
                </>
                }
                {token && <li onClick={() => {
                    dispatch(workingTableSliceActions.resetWorkingTable())
                    dispatch(authActions.logout())}}>
                    <div className="menuItemandIcon">
                        <NavLink activeClassName="activeLink" to="/signin">
                            <span  >Logout</span>
                            <i className="fas fa-sign-out-alt"></i>
                        </NavLink>
                    </div>
                </li>}
            </ul>
            {token && <span id="greeting">The kitchen is yours, {name}</span>}
        </nav>

    </>
}

export default Navigation;