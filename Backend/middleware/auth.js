const jwt = require('jsonwebtoken');

const secret = 'test';
// current middleware role and flow
// click the like button => auth middleware(next) => like controller...
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // if token length is less than 500 then that token is generated through our backend endpoint and if it is not then is the token send by google.
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {  
        // our backend endpoint check    
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
        // google auth backend endpoint check
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;// sub is an id to be able to differentiate the users.
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;