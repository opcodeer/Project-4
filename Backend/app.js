const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Import body-parser
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { body,validationResult} = require('express-validator');
const JWT_SECRET = 'Gautamisagoodb$oy'; // Use a more secure secret key in production

const app = express();
const port = 8000;
// Connect to MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/userinfo');
        console.log("Successfully connected to database");
    } catch (error) {
        console.log("Error occurred: " + error);
    }
}
connectToDatabase();

// Define Mongoose schemas
const signupSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
}, { collection: "signups" });

// Create Mongoose models
const SignUp = mongoose.model('SignUp', signupSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    // This can be a simple response or you can render a React component if you're using server-side rendering
    res.send("Welcome to the home page");
});
// Routes
app.post('/signup',[
  body('username', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ success, errors: errors.array() });
      }
      let user = await SignUp.findOne({ email: req.body.email });
      if (user) {
          return res.status(400).json({ success, error: 'A user with this email already exists' });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user = await SignUp.create({
          name: req.body.username,
          password: hashedPassword,
          email: req.body.email,
      });
      const payload = {
          user: {
              id: user.id,
          },
      };
      const authtoken = jwt.sign(payload, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
      // You don't need to call signupData.save() here as you've already created the user with SignUp.create()
  } catch (error) {
      console.log(error);
      res.status(400).send("There is some issue in saving your data");
  };
});

// Login route with validation middleware
app.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ], async (req, res) => {
    let success = false;
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // Check if user exists
      const { password } = req.body;
      const user = await SignUp.findOne({ email:req.body.email });
      if(!user ||!(await bcrypt.compare(password,user.password))){
        return res.status(400).json({success,error:'Please try to login with correct credentials'});
      }
      const payload = {
        user:{
          id:user.id,
        },
      };
      const authtoken = jwt.sign(payload,JWT_SECRET);
      success = true;
      res.json({success,authtoken});
    } catch (error) {
      console.log(error);
      // Send JSON response indicating server error
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

// Start the server
app.listen(port, () => {
    console.log(`The application successfully started on port ${port}`);
});