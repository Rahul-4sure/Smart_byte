const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {

    const {name,email,password} = req.body;

    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({
            success:false,
            message:"user, already exist"
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    user = new User({
        name:name,
        email:email,
        password:hashedPassword
    });

    await user.save();

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
    );

    res.status(201).json({
        success:true,
        message:'User registetred successfully',
        token,
        user: { id: user._id, name: user.name, email: user.email }
    })

  } catch (error) {

    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });


  }
};

exports.login = async(req,res)=>{
  try {
    
    const {email,password} = req.body;

    if(!email || !password){
      return res.ststus(404).json({
        success:false,
        message:"All fields are required"
      })
    }

    let user = await User.findOne({email});

    if(!user){
      return res.ststus(404).json({
        success:false,
        message:"User does not exist, Register please."
      })
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
      return res.status(404).json({
        success:false,
        message:"Wrong Passwword"
      })
    }

    const token = jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:'1h'}
    );

    res.cookie('token',token,{
      httpOnly:true,
      secure:false,
      maxAge:3600000
    }).json({
      success: true,
      token,
      message: "Login successful!",
      user: { id: user._id, name: user.name }
    })
  } catch (error) {

    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
    
  }
}

// register -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzQyYzU2MWM0NzQ5MGEyMjQ0OGIzYiIsImlhdCI6MTc3NDQ2NDA4NiwiZXhwIjoxNzc0NDY3Njg2fQ.HWFcD7QlpfgXb4TPmM7Y1vsX1f4HJU3x7_AekUsLNpQ

// login -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzQyYzU2MWM0NzQ5MGEyMjQ0OGIzYiIsImlhdCI6MTc3NDQ2NDE5MywiZXhwIjoxNzc0NDY3NzkzfQ.Oqa8_dMXEisojZGx3fBpXIfgLwMcTw1WEioGr9DeEZs