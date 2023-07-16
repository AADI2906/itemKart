//from here we are gonna send out jwttoken and also save it in cookies....

const getToken=(user , res , statusCode)=>{
    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24 * 60 * 60 * 1000
        ),
        httpOnly:true
    }
    //saving the got token into cookies... so that we can access em later
    res.status(statusCode).cookie("token" , token , options).json({
        success:true ,
        token,
        user
    })
}


module.exports = getToken;