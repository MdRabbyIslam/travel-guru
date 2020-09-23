import React, { useContext } from 'react';
import "./SearchHotel.css"
import { useParams } from 'react-router-dom';
import fakeData from '../fakeData/FakeData';
import Navigation from '../Navigation/Navigation';
import star from "../../Image/Icon/star_1_.png"
import MyMap from '../Map/MyMap';
import { BookingContext } from '../../App';


const SearchHotel = () => {
    const {id} =useParams()
    const[bookingInfo,setBookingInfo]=useContext(BookingContext)
    console.log("param:",id,"booking:",bookingInfo.id)

    const hotelsData = fakeData.filter(hotels => hotels.catagory === "hotel")
    const touristPlace = fakeData.find(place => place.id === parseInt(id))
    console.log(touristPlace)

    return (
        <div>
            <Navigation isSerch={false}   ></Navigation>
            <hr />
            <div className="searchResult">
                <div className="hotels">
                    <h2 >Stay In {touristPlace.name} </h2>
                    {
                        hotelsData.map(hotel =>
                            <div key={hotel.id} className="single-hotel">
                                <div className="hotel-image">
                                    <img src={hotel.imgUrl} alt="" />
                                </div>
                                <div className="hotel-information">
                                    <h3>{hotel.title}</h3>
                                    <pre>4 guest  2 bedroom  2 beds  2 baths</pre>

                                    <pre>Wif Air Conditioning Kitchen</pre>

                                    <pre>Canceletion flexibility available</pre>

                                    <pre><img style={{ width: "5%" }} src={star} alt="" /> {hotel.ratings}  ${hotel.price} /per night</pre>
                                </div>
                            </div>
                        )
                    }

                </div>
                <div className="map">
                    <MyMap style={{ height: "100%" }}></MyMap>
                </div>
            </div>
        </div>
    );
};

export default SearchHotel;