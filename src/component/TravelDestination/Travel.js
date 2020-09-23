import React from 'react';
import fakeData from '../fakeData/FakeData';
import "./Travel.css"

const Travel = (props) => {

    const { imgUrl, name } = props.singleDest
    const handleTouristImg = props.handleTouristImg

    return (
        <div className="travel">
            <div className="singleTravelDestImg" onClick={() => handleTouristImg(name)} style={{ position: "relative" }}>
                <img className="dest-img" src={imgUrl} alt="" />
                <div className="dest-name" ><h3>{name}</h3></div>
            </div>

        </div>
    );
};

export default Travel;