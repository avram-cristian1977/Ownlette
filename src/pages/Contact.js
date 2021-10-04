import './Contact.css'
import { useState } from 'react'

import emailjs from 'emailjs-com'

const Contact = () => {
      const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [messageSent, setMessageSent] = useState("")

    const submitEmailHandler = (ev) => {
        ev.preventDefault()
        emailjs.sendForm(
            "service_w4z2933", "template_uvwmb25", ev.target, "user_wqLTfWBPG7HMvi09wZKcs"
        ).then(response => {
            setMessageSent("message sent!")
            console.log(response)
        }).catch(err => console.log(err))
        setName("")
        setEmail("")
        setMessage("")
    }
console.log(name, email, message);
    return <> <div className="userDataFormContainer">
        <div className="createFormDataWrapper">
            <form onSubmit={submitEmailHandler} >
               <div> <label >Your Name : </label>
                <input type="text" value={name}  name="name"
                    onChange={(ev) => setName(ev.target.value)} /></div>
                <div><label>Your Email  : </label>
                <input type="email" value={email} name="user_email"
                    onChange={(ev) => setEmail(ev.target.value)} /></div>

                <button className="sendMsgBtn">Send</button>
                <textarea name="message" cols="60" rows="7"
                    value={message}
                    onChange={(ev) => setMessage(ev.target.value)}
                ></textarea>
<h5 className="messageSent">{messageSent}</h5>
            </form>
        </div>
    </div>
    <div className="contactWrapper">
        <h2>Contact</h2>
        <p><i class="fas fa-house-user"></i>Dezrobirii Str. no 85, Craiova, Romania </p>
        <p><i class="fas fa-envelope"></i> email : asct1977ro@gmail.com</p>
        <p><i class="fas fa-mobile-alt"></i>mobile : +40728181218 </p>
        <p>website : www.avram-cristian.ro</p>
    </div>
    </>
}
 
export default Contact;