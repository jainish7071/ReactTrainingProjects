const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const JWT_SECERET = "TODOApp7071";

const authenticate = async (req, res, next) => {
    const authToken = req.headers.authtoken;
    let  status = false;
    if(!authToken){
        return res.status(401).send({status  , data : "Unauthorised Access" , header : req.headers});
    }
    try {
        let data = jwt.verify(authToken,JWT_SECERET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({status  , data : "Unauthorised Access"});
    }
}
module.exports = authenticate;