// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import "./LogIn.css"
// import * as firebase from "firebase/app";
// import "firebase/auth";
// import firebaseConfig from '../../fireBaseConfig';
// import googleIcon from "../../Image/Icon/google.png";
// import facebookIcon from "../../Image/Icon/fb.png"

// firebase.initializeApp(firebaseConfig)

// const LogIn = (props) => {

//     const [user, setUser] = useState({
//         email: "",
//         password: "",
//         name: "",
//         emailError: "",
//         passwordError: "",
//         nameError: "",
//         emailFromSignup: '',
//         errorMessage: "",
//         error: "",
//     })


//     const handleSubmit = (e) => {
//         if (user.email && user.password) {
//             if (props.signUp) {

//                 firebase.auth().createUserWithEmailAndPassword(uer.email, user.password)
//                     .then(res => {
//                         const { displayName, email } = res.user;
//                         console.log(displayName, email)
//                         const newUser = { ...user }
//                         newUser.emailFromSignup = email;
//                         setUser(newUser)
//                     })
//                     .catch(function (error) {
//                         // Handle Errors here.
//                         const errorMessage = error.message;

//                         const newUser = { ...user }
//                         newUser[errorMessage] = errorMessage;
//                         setUser(newUser)

//                     });

//             }
//             if (!this.props.signUp) {
//                 firebase.auth().signInWithEmailAndPassword(user.email, uer.password)
//                     .then(res => {
//                         const { displayName, email } = res.user;
//                         console.log(displayName, email)
//                     })
//                     .catch(function (error) {
//                         // Handle Errors here.
//                         var errorCode = error.code;
//                         const errorMessage = error.message;
//                         const newUser = { ...user }
//                         newUser[errorMessage] = errorMessage;
//                         setUser(newUser)
//                     })
//             }
//         }
//         e.preventDefault()
//     }

//     const validation = (target) => {
//         const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//         const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

//         if (target.name === "name") {
//             if (target.value === "") return false;
//             if (target.value) return true;
//         }
//         if (target.name === "email") return regexEmail.test(target.value);
//         if (target.name === "password") return regexPassword.test(target.value);

//         return true;
//     }


//  const   handleOnBlur = (e) => {
//         const target = e.target;
//         const newUser = { ...user }
//         if (target.name === "email") {
//             const isValidEmail = validation(target);

//             if (isValidEmail) {
//                 // email: target.value, emailError: "",
//                 newUser.email= target.value;
//                 newUser.emailError = ""
//                 setUser(newUser)
//             } else {
//                 // emailError: "please input valid email"
//                 newUser.emailError = "please input valid email"
//                 setUser(newUser)
//             }
//         }

//         if (target.name === "password") {
//             const isValidPassword = this.validation(target);

//             if (isValidPassword) {
//                 // email: target.value, emailError: "",
//                 newUser.password = target.value;
//                 newUser.passwordError = ""
//                 setUser(newUser)
//             } else {
//                 // emailError: "please input valid email"
//                 newUser.emailError = "Minimum eight characters, at least one letter and one number"
//                 setUser(newUser)
//             }

//         }

//         if (target.name === "name") {
//             const isValidName = this.validation(target);

//             if (isValidName) {
//                 // email: target.value, emailError: "",
//                 newUser.name = target.value;
//                 newUser.nameError = ""
//                 setUser(newUser)
//             } else {
//                 // emailError: "please input valid email"
//                 newUser.nameError = "fill your name"
//                 setUser(newUser)
//             }

//         }
//         // console.log(this.state.password)

//     }



    
//         return (
//             <div className="logIn-form-container">


//                 <form onSubmit={handleSubmit} className="log-in-form" >
//                     <h2>{user.emailFromSignup}</h2>

//                     {!props.signUp &&
//                         <div>
//                             <button className="auth-btn"><img style={{ width: "26px" }} src={googleIcon} alt="" /> <span>log In with google</span></button>
//                             <button className="auth-btn"><img style={{ width: "26px" }} src={facebookIcon} alt="" /> <span>log In with Facebook</span></button>

//                         </div>
//                     }

//                     <h2 style={{ textAlign: "center" }}>{props.signUp ? "Sign Up" : "Log In"}</h2>

//                     {props.signUp &&
//                         <div>
//                             <label htmlFor="">Name :</label>
//                             <input required type="text" name="name" autoComplete="name" onBlur={handleOnBlur} placeholder="type your name" />
//                         </div>
//                     }
//                     {user.nameError &&
//                         <p style={{ color: "red" }} >{user.nameError}</p>
//                     }

//                     <label htmlFor="email">Email : </label>
//                     <input required autoComplete="email" type="text" name="email" id="email" onBlur={handleOnBlur} placeholder="Your Email Address" />

//                     {user.emailError &&
//                         <p style={{ color: "red" }} >{user.emailError}</p>
//                     }
//                     <br />

//                     <label htmlFor="password">Password :</label>
//                     <input required type="password" autoComplete="current-password" name="password" id="password" onBlur={handleOnBlur} placeholder="Your PassWord" />

//                     {user.passwordError &&  
//                         <p style={{ color: "red" }} >{this.state.passwordError}</p>
//                     }

//                     <div style={{ display: "flex", justifyContent: "space-between" }}>

//                         <label htmlFor="" style={{ color: "black" }}>
//                             <input type="checkbox" name="remember" id="remember" />
//      Remember me
//      </label>
//                         <div style={{ textAlign: "right" }}>
//                             <Link className="link" to="/" style={{ pointerEvents: "none" }}>forgot password?</Link>
//                         </div>
//                     </div>             <br />
//                     <button className="btn" type="submit" >{props.signUp ? "Sign Up" : "sign In"}</button>
//                     <br />
//                     <div style={{ marginTop: "10px", textAlign: "right" }}>
//                         {props.signUp ?
//                             <Link to="/logIn">Already Have an account ?</Link> :
//                             <Link to="/signUp">Create A new Account ?</Link>
//                         }
//                     </div>
//                     {user.errorMessage &&
//                         <h2 style={{ color: "red" }}>{user.errorInfo}</h2>
//                     }

//                 </form>
//             </div>
//         )
//     };


// export default LogIn;

import React from 'react';

const practice = () => {
    return (
        <div>
            
        </div>
    );
};

export default practice;