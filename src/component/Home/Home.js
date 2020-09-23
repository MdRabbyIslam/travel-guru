import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookingForm from '../BokkingForm/BookingForm';
import fakeData from '../fakeData/FakeData';
import LogIn from '../LogIn/LogIn';
import Navigation from '../Navigation/Navigation';
import Travel from '../TravelDestination/Travel';
import "./Home.css"

const Home = () => {

    const mydata = fakeData;
    const touristDestinationsData = mydata.filter(singleData => singleData.catagory === "destinaton")
    const [touristDest, setTouristDest] = useState(touristDestinationsData)
    const [touristInfo, setTouristInfo] = useState(touristDestinationsData[0]);
    const [booking, setBooking] = useState(false)

    const handleTouristImg = (name) => {
        const selectedPlace = touristDestinationsData.find(place => place.name === name)
        setTouristInfo(selectedPlace)
    }

    const handleBooking = () => {
        setBooking(true);
    }

    return (
        <div className="background-img">
    
            <Navigation isSearch={true} ></Navigation>
            <br /><br /> <br /> <br />
            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                <div className="travel-short-info">

                    <h1>{touristInfo.title}</h1>

                    <p>{touristInfo.discription}</p>
                    <br />
                    {!booking &&
                        <button onClick={handleBooking} className="Btn btn-booking">
                            Booking &rarr;
                        </button>
                    }
                </div>
                <div className="travel-imgs" >
                    {booking
                        ? <BookingForm touristInfo={touristInfo}>


                        </BookingForm>

                        : <>
                            {
                                touristDest.map(singleDest =>
                                    <Travel key={singleDest.id} handleTouristImg={handleTouristImg} singleDest={singleDest}>
                                    </Travel>)
                            }
                        </>}

                </div>
            </div>
        </div>
    );
};

export default Home;