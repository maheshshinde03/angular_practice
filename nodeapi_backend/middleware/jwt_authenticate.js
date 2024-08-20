const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
  
  const authorization = req.headers.authorization;
  //console.log('token =>', authorization);
  if(!authorization){
    return res.status(401).json({error: 'No token provided.'});
  }


  const token = req.headers.authorization.split(' ')[1];
 // console.log(token);
  if (!token) return res.status(401).json({error: 'Unauthorized'});

  try{
    const decoded =  jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();

  }catch(err){
   // console.log(err);
    res.status(401).json({error: 'Invalid token'});
  }
}

const generateToken = (userData) => {
    return jwt.sign({userData}, process.env.JWT_SECRET, { expiresIn: "1h" });
}

module.exports  = {jwtAuthMiddleware, generateToken};
