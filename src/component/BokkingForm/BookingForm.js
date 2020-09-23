import React, { useContext, useState } from 'react';
import "./BookingForm.css"
import "react-datepicker/dist/react-datepicker.css";
import { BookingContext } from '../../App';
import { Link, useHistory } from 'react-router-dom';



const BookingForm = (props) => {
    const { name, id } = props.touristInfo
    const history = useHistory()

    const [bookingInfo, setBookingInfo] = useContext(BookingContext)
    console.log(bookingInfo)

    const [userBookingInfo,setUserBookingInfo]=useState({
        origin:"dhaka",
        destination:name,
        id:""
    })

    // const [originText, setOriginText] = useState("Dhaka");
    // const [destintionText, setDestinationText] = useState(name)
    // const [update, setUpdate] = useState({})




    const handleOnChange = (event) => {
        event.preventDefault()
        if (event.target.name === "origin") {
            userBookingInfo.origin=(event.target.value)
        }
        if (event.target.name === "destination") {
            userBookingInfo.destination=(event.target.value)
        }
    }


    const handleOnSubmit = (event) => {
        event.preventDefault();

        const newUser = {...bookingInfo}
        if (newUser.origin === undefined) {
            newUser.origin = userBookingInfo.origin;
        }
        if (newUser.destination === undefined) {
            newUser.destination = userBookingInfo.destination;
        }
        newUser.id = id;
        setBookingInfo(newUser)
        let path = `searchHotel/${id}`
        history.push(path)

    }

    return (
        <div>
            <p>{bookingInfo.origin}</p>
            <p>{bookingInfo.destination}</p>

            <form onSubmit={handleOnSubmit} className="form">
                <label htmlFor="">Origin</label>
                <input type="text" name="origin" onChange={handleOnChange} value={userBookingInfo.origin} />

                <label htmlFor="">Destintion</label>
                <input type="text" name="destination" onChange={handleOnChange} value={userBookingInfo.destination} />

                <div className="date-calander">
                    <div className="start">
                        <label htmlFor="">From</label>
                        <input type="date" name="" id="" />
                    </div>
                    <div className="end">
                        <label htmlFor="">To</label>
                        <input type="date" name="" id="" />
                    </div>
                </div>
                <br />
                <button type="submit">Submit</button>
                {/* <button type="submit" className="Btn">

                <Link style={{ width: "100%" }} to={`/searchHotel/${id}`}>Submit
            </Link>
            </button> */}
            </form>
        </div>
    )
};

export default BookingForm;