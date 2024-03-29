const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = function(req,res,next) {
      
      const jwtToken = req.header("token")
      // console.log(req.headers)
      // console.log(jwtToken)

      if (! jwtToken){
        return res.status(403).json("Not Authorize")
      }
      try{

      const payload = jwt.verify(jwtToken,process.env.jwtSecret)

      req.user = payload.user;
      next();
    }catch(err){
        console.error(err.message)
        return res.status(401).json("token not valid")
    }
}