import React, { useContext } from 'react';
import "./Navigation.css";
import logo from "../../Image/main/Logo.png"
import { Link, useHistory } from 'react-router-dom';
import { BookingContext } from '../../App';
import * as firebase from "firebase/app";
import "firebase/auth";

const Navigation = (props) => {
    const { isSearch } = props

    const [bookingInfo, setBookingInfo] = useContext(BookingContext)
    let history = useHistory();
    const handleSignOut = () => {
        firebase.auth().signOut().then(function () {
            console.log("google sign out")
            const signedInUser = { ...bookingInfo }
            signedInUser.isSignedIn = false;
            signedInUser.signedInName = "";
            signedInUser.signedInEmail = "";
            setBookingInfo(signedInUser)

            history.push("/")
        }).catch(function (error) {
            // An error happened.
        });


    }
    return (
        <div className="navigation">
            <Link to="/"><img className="logo" src={logo} alt="" /></Link>
            {isSearch && <form action="">
                <input className="searchBox" type="search" name="search" placeholder="search your destination" id="" />
                <input className="searchBox searchBtn" type="submit" id="search" value="search" />
            </form>}
            <div className="navigation-links">
                <Link style={isSearch ? { color: "white" } : { color: "black" }} to="/">News</Link>
                <Link style={isSearch ? { color: "white" } : { color: "black" }} to="/">Destination</Link>
                <Link style={isSearch ? { color: "white" } : { color: "black" }} to="/">Blog</Link>
                <Link style={isSearch ? { color: "white" } : { color: "black" }} to="/">Contact</Link>

                {!isSearch &&
                    <div>
                        <span style={{ color: "red", border: "2px solid blue", padding: "5px", borderRadius: "5px", marginRight: "15px" }}>{bookingInfo.signedInEmail}</span>
                        {bookingInfo.signedInName &&
                            <span style={{ color: "red", border: "2px solid blue", padding: "5px", borderRadius: "5px" }}>{bookingInfo.signedInName}</span>
                        }
                    </div>
                }
                {isSearch === true
                    ? <Link style={isSearch ? { color: "white" } : { color: "black" }} to="/login"><button  className="logBtn Btn">LogIn</button></Link>
                    : <Link  onClick={handleSignOut} style={isSearch ? { color: "white" } : { color: "black" }} to="/login"><button className="logBtn Btn">LogOut</button></Link>
                }

            </div>
        </div>
    );
};

export default Navigation;