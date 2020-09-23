import React from 'react';
import LogIn from '../LogIn/LogIn';

const SignUp = () => {

    // const handleSignUpBtn = () => {
    //     console.log("clicked")
    // }

    return (
        <div style={{ height: "100vh" }}>
            <LogIn signUp={true}></LogIn>
        </div>
    );
};

export default SignUp;