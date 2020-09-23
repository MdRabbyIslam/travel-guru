import React, { useContext } from 'react';
import "./Navigation.css";
import logo from "../../Image/main/Logo.png"
import { Link } from 'react-router-dom';
import { BookingContext } from '../../App';

const Navigation = (props) => {
    const { isSearch } = props

    const [bookingInfo, setBookingInfo] = useContext(BookingContext)
    return (
        <div className="navigation">
            <Link to="/"><img className="logo" src={logo} alt="" /></Link>
            {isSearch && <form action="">
                <input type="search" name="search" placeholder="search your destination" id="" />
                <input type="submit" id="search" value="search" />
            </form>}
            <div className="navigation-links">
                <Link style={isSearch ? { color: "white" } : { color: "black" }} to="/login">News</Link>
                <Link style={isSearch ? { color: "white" } : { color: "black" }} to="/signUp">Destination</Link>
                <Link style={isSearch ? { color: "white" } : { color: "black" }} to="/home">Blog</Link>
                <Link style={isSearch ? { color: "white" } : { color: "black" }} to="/">Contact</Link>
                
                {!isSearch &&
                    <div>
                        <span style={{ color: "red", border: "2px solid blue", padding: "5px", borderRadius: "5px",marginRight:"15px" }}>{bookingInfo.signedInEmail}</span>
                        {bookingInfo.signedInName &&
                            <span style={{ color: "red", border: "2px solid blue", padding: "5px", borderRadius: "5px" }}>{bookingInfo.signedInName}</span>
                        }
                    </div>
                }
                {isSearch === false ?
                    <Link style={isSearch ? { color: "white" } : { color: "black" }} to="/login"><button className="Btn">LogIn</button></Link>:
                    <Link style={isSearch ? { color: "white" } : { color: "black" }} to="/login"><button className="Btn">LogOut</button></Link>
                }

            </div>
        </div>
    );
};

export default Navigation;