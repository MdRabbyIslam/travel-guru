import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import "./LogIn.css"
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../fireBaseConfig';
import googleIcon from "../../Image/Icon/google.png";
import facebookIcon from "../../Image/Icon/fb.png"
import { BookingContext } from '../../App';

firebase.initializeApp(firebaseConfig)

const LogIn = (props) => {
    let history = useHistory();
    let location = useLocation();
    // let { from } = location.state || { from: { pathname: "/" } };
    let { from } = location.state || { from: { pathname: "/" } };

    const [bookingInfo, setBookingInfo] = useContext(BookingContext)

    console.log(bookingInfo)
    const [user, setUser] = useState({
        email: "",
        password: "",
        name: "",
        emailError: "",
        passwordError: "",
        nameError: "",
        emailFromSignup: '',
        errorMessage: "",
        error: "",
    })


    const handleSubmit = (e) => {
        if (user.email && user.password) {
            if (props.signUp) {
                firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                    .then(res => {
                        const { displayName, email } = res.user;
                        const newUser = { ...user }
                        const name = newUser.name;
                        updateUserInfo(name)
                        // setUser(newUser)
                        const signedInUser = { ...bookingInfo }
                        signedInUser.isSignedIn = true;
                        signedInUser.signedInName = displayName;
                        signedInUser.signedInEmail = email;
                        setBookingInfo(signedInUser)


                        let path = `searchHotel/${bookingInfo.id}`
                        history.push(path)

                    })
                    .catch(error => {
                        const errorMessage = error.message;
                        const newUser = { ...user }
                        newUser.errorMessage = errorMessage;
                        setUser(newUser)
                    });

            }
            if (!props.signUp) {
                firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                    .then(res => {
                        const { displayName, email } = res.user;
                        console.log(displayName, email)

                        const signedInUser = { ...bookingInfo }
                        signedInUser.isSignedIn = true;
                        signedInUser.signedInName = displayName;
                        signedInUser.signedInEmail = res.user.email;
                        setBookingInfo(signedInUser)

                        history.replace(from)

                    })
                    .catch(error => {
                        // Handle Errors here.
                        const errorMessage = error.message;
                        const newUser = { ...user }
                        newUser.errorMessage = errorMessage;
                        setUser(newUser)
                        console.log(user.errorMessage)
                    })
            }
        }
        e.preventDefault()
    }


    const updateUserInfo = (name) => {
        const user = firebase.auth().currentUser;
        // var name, email, photoUrl, uid, emailVerified;

        user.updateProfile({
            displayName: name,

        }).then(function () {
            console.log("update suceesful")
        }).catch(function (error) {
            // An error happened.
            console.log(error.message)
        });

    }

    const validation = (target) => {
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

        if (target.name === "name") {
            if (target.value === "") return false;
            if (target.value) return true;
        }
        if (target.name === "email") return regexEmail.test(target.value);
        if (target.name === "password") return regexPassword.test(target.value);

        return true;
    }

    const addingInfo = (isValid, target) => {
        const name = target.name;
        const nameError = `${name}Error`;
        const newUser = { ...user }
        if (isValid) {
            newUser[name] = target.value;
            newUser[nameError] = "";
            setUser(newUser)
        }
        if (!isValid) {
            if (nameError === "emailError") newUser.emailError = "please input valid email"
            if (nameError === "nameError") newUser.nameError = "fill your name"
            if (nameError === "passwordError") newUser.passwordError = "Minimum eight characters, at least one letter and one number"
            setUser(newUser)
        }
    }

    const handleOnBlur = (e) => {
        const target = e.target;

        const isValid = validation(target);
        addingInfo(isValid, target)

    }

    const movingSignUp = (signorlog) => {
        const newUser = { ...bookingInfo }
        newUser.signOrLog = signorlog;
        setBookingInfo(newUser)
        console.log(bookingInfo)
    }

    return (
        <div className="logIn-form-container">
            <form onSubmit={handleSubmit} className="log-in-form" >
                {user.errorMessage &&
                    <h2>{user.errorMessage}</h2>
                }
                {!props.signUp &&
                    <div>
                        <button className="auth-btn"><img style={{ width: "26px" }} src={googleIcon} alt="" /> <span>log In with google</span></button>
                        <button className="auth-btn"><img style={{ width: "26px" }} src={facebookIcon} alt="" /> <span>log In with Facebook</span></button>
                    </div>
                }

                <h2 style={{ textAlign: "center" }}>{props.signUp ? "Sign Up" : "Log In"}</h2>

                {props.signUp &&
                    <div>
                        <label htmlFor="">Name :</label>
                        <input required type="text" name="name" autoComplete="name" onBlur={handleOnBlur} placeholder="type your name" />
                    </div>
                }
                {user.nameError &&
                    <p style={{ color: "red" }} >{user.nameError}</p>
                }

                <label htmlFor="email">Email : </label>
                <input required autoComplete="email" type="text" name="email" id="email" onBlur={handleOnBlur} placeholder="Your Email Address" />

                {user.emailError &&
                    <p style={{ color: "red" }} >{user.emailError}</p>
                }
                <br />

                <label htmlFor="password">Password :</label>
                <input required type="password" autoComplete="current-password" name="password" id="password" onBlur={handleOnBlur} placeholder="Your PassWord" />

                {user.passwordError &&
                    <p style={{ color: "red" }} >{user.passwordError}</p>
                }

                <div style={{ display: "flex", justifyContent: "space-between" }}>

                    <label htmlFor="" style={{ color: "black" }}>
                        <input type="checkbox" name="remember" id="remember" />
                        Remember me
                     </label>
                    <div style={{ textAlign: "right" }}>
                        <Link className="link" to="/" style={{ pointerEvents: "none" }}>forgot password?</Link>
                    </div>
                </div>             <br />
                {props.signUp ?
                    <button className="btn" type="submit" >Sign Up</button> :
                    <button className="btn" type="submit" >log In</button>

                }
                <br />
                <div style={{ marginTop: "10px", textAlign: "right" }}>
                    {props.signUp ?
                        <Link to="/login">Already Have an account ?</Link> :
                        <Link to="/signUp">Create A new Account ?</Link>
                    }
                </div>
                {user.errorMessage &&
                    <h2 style={{ color: "red" }}>{user.errorMessage}</h2>
                }

            </form>
        </div>
    )
};

export default LogIn;