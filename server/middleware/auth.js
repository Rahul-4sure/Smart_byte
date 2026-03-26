const jwt = require('jsonwebtoken')

module.exports = function (req,res,next){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            success:false,
            message:"no token, authorization denied!"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid!" });
    }


}