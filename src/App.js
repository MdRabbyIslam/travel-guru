import React, { createContext, useContext, useState } from 'react';
import './App.css';
import Home from './component/Home/Home';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LogIn from './component/LogIn/LogIn';
import SearchHotel from './component/SearchHotel/SearchHotel';
import MyMap from './component/Map/MyMap';
import SignUp from './component/SignUP/SignUp';
import practice from './practice';
import PrivateRoute from './component/PrivateRoute/PrivateRoute'
export const BookingContext = createContext();

function App() {
  const [bookingInfo, setBookingInfo] = useState({
    isSignedIn: false,
    signedInName: "",
    signedInEmail: "",
    signOrLog: "login"
  })
  return (
    <div className="App">
      <BookingContext.Provider value={[bookingInfo, setBookingInfo]}>
        <Router>
          <Switch>
            <Route exact  path="/" component={Home} />
            <Route exact path="/map" component={MyMap} />
            <Route exact path="/practice" component={practice} />
            <PrivateRoute path="/searchHotel/:id" >
              <SearchHotel/>
              </PrivateRoute>

            <Route exact path="/login" component={LogIn} />
            <Route exact Path="/signUp" component={SignUp} />
            <Route path="*" component={Home}/>
          </Switch>

        </Router>
      </BookingContext.Provider>

    </div>
  );
}

export default App;
