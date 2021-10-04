import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD12keujud1_qued8M5WaZ6FVZ25qTJU3c",
  authDomain: "ownlette.firebaseapp.com",
  projectId: "ownlette",
  storageBucket: "ownlette.appspot.com",
  messagingSenderId: "744072046518",
  appId: "1:744072046518:web:0f1e17316ebd00f0c00317"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore()

export const createUserProfile = (user, data) => {

    if(!user){
        return
    }

    const userRef = firestore.doc(`users/${user.localId}`);
    const snapshot = userRef.get();

    if(!snapshot.exist){
        const name = data.name

        try {
            userRef.set({
                name:name
            })
            
        } catch (error) {
            console.log("error creating user", error);
        }
    }

}

export default firebase