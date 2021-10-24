import React from "react";
import GoogleLogin from "react-google-login";


const SignIn = ()=>{

    const handleSuccess =(response)=>{
        console.log(response)
    }

    const handleFailure = (response)=>{
        console.log(response)
    }
    return(
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                cookiesPolicy={"single_host_origin"}
            />
        
        </div>
    )
}

export default SignIn;