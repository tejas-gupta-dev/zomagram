const userModel = require('../models/user.model');
const foodpartners = require('../models/foodpartner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const cookieOptions = {
  secure: true,
  sameSite: "None",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000
};


async function registeruser(req,res) {
    const {fullName, email, password} = req.body;
    const isexist = await userModel.findOne({email: email});

    if(isexist) {
        return res.status(400).json({message: "user already exist"});
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        fullName,
        email,
        password:hash,
    })

    const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_TOKEN)
    res.cookie("token", token, {
    ...cookieOptions,
    httpOnly: true,
  });

  // 🔥 ROLE COOKIE (frontend readable)
  res.cookie("role", "user", {
    ...cookieOptions,
    httpOnly: false,
  });
//     res.cookie("token", token, {
//     httpOnly: true,
//     secure: true,        // Render = HTTPS
//     sameSite: "None",    // Cross-domain cookie
//     maxAge: 7 * 24 * 60 * 60 * 1000
// });
//     res.cookie("role", "user", {
//   secure: process.env.NODE_ENV === "production",
//   sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
// });
    
    res.status(201).json({message: "user registered",
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        },
    });
}


async function authMe(req, res) {
  try {
    const token = req.cookies.token;
    const role = req.cookies.role;

    if (!token || !role) {
      return res.status(401).json({ authenticated: false });
    }

    jwt.verify(token, process.env.JWT_TOKEN);

    return res.status(200).json({
      authenticated: true,
      role,
    });
  } catch (err) {
    return res.status(401).json({ authenticated: false });
  }
}

async function loginuser(req,res) {
    const { email, password} = req.body;
    const user = await userModel.findOne({email:email})
    if(!user){
        res.status(400).json({message:"user not found!"});
    }

    const ispassword = await bcrypt.compare(password,user.password);
    if(!ispassword) {
        res.status(400).json({message:"user not found!"});
    }

    const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_TOKEN)
    res.cookie("token", token, {
    ...cookieOptions,
    httpOnly: true,
  });

  // 🔥 ROLE COOKIE (frontend readable)
  res.cookie("role", "user", {
    ...cookieOptions,
    httpOnly: false,
  });
//     res.cookie("token",token, {
//     httpOnly: true,
//     secure: true,        // Render = HTTPS
//     sameSite: "None",    // Cross-domain cookie
//     maxAge: 7 * 24 * 60 * 60 * 1000
// });
//     res.cookie("role", "user", {
//   secure: process.env.NODE_ENV === "production",
//   sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
// });
    res.status(200).json({
        message:"login successfully",
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        },
    })
}

function logoutuser(req,res) {
    res.clearCookie("token", cookieOptions);
  res.clearCookie("role", cookieOptions);
//     res.clearCookie("token", {
//   secure: process.env.NODE_ENV === "production",
//   sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
// });
    res.status(200).json({
        message:"user logout successsfully"
    })
}

async function registerfoodpartner(req,res) {
    const {name, email, password, contactName, phone, address} = req.body;
    const isavailable = await foodpartners.findOne({email: email});
    if(isavailable){
        res.status(400).json({message:"user already exist"});
    }

    const hash2 = await bcrypt.hash(password, 10);
    const foodpartner = await foodpartners.create({
        name: name,
        email: email,
        password: hash2,
        contactName: contactName,
        phone: phone,
        address: address,
    });

    const token = jwt.sign({
        id:foodpartners._id,
    }, process.env.JWT_TOKEN)

    res.cookie("token", token, {
        ...cookieOptions,
        httpOnly: true,
    });

   res.cookie("role", "foodpartner", {
       ...cookieOptions,
       httpOnly: false,
   });
//     res.cookie("token",token, {
//     httpOnly: true,
//     secure: true,        // Render = HTTPS
//     sameSite: "None",    // Cross-domain cookie
//     maxAge: 7 * 24 * 60 * 60 * 1000
// });
//     res.cookie("role", "foodpartner", {
//   secure: process.env.NODE_ENV === "production",
//   sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
// });


    res.status(201).json({message: "registeration successful",
        foodpartner: {
            _id: foodpartner._id,
            email: foodpartner.email,
            name: foodpartner.name,
            address: foodpartner.address,
            contactName: foodpartner.contactName,
            phone: foodpartner.phone,
        }
    });
}

async function loginfoodpartner(req,res) {
    const { email, password } = req.body;
    const emailfound = await foodpartners.findOne({email});
    if(!emailfound){
        res.status(400).json({
            message: "user not found",
        })
    }
    const passwordcheck = await bcrypt.compare(password, emailfound.password);
    if(!passwordcheck){
        res.status(400).json({
            message: "Invalid credential",
        })
    }
    const token = jwt.sign({
        id: emailfound._id,
    }, process.env.JWT_TOKEN)


    res.cookie("token", token, {
    ...cookieOptions,
    httpOnly: true,
  });

  res.cookie("role", "foodpartner", {
    ...cookieOptions,
    httpOnly: false,
  });

//     res.cookie("token",token, {
//     httpOnly: true,
//     secure: true,        // Render = HTTPS
//     sameSite: "None",    // Cross-domain cookie
//     maxAge: 7 * 24 * 60 * 60 * 1000
// });
//     res.cookie("role", "foodpartner", {
//   secure: process.env.NODE_ENV === "production",
//   sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
// });
    
    res.status(200).json({
        message: "login successful",
        foodpartner: {
            name:emailfound.name,
            email:emailfound.email,
            id:emailfound._id,
        }
    })
}

function logoutfoodpartner(req,res) {
    res.clearCookie("token", cookieOptions);
    res.clearCookie("role", cookieOptions);
//     res.clearCookie("token", {
//   secure: process.env.NODE_ENV === "production",
//   sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
// });
    res.status(200).json({message: "logout successful"});
}



module.exports = {
    registeruser,
    loginuser,
    logoutuser,
    registerfoodpartner, 
    loginfoodpartner, 
    logoutfoodpartner,
    authMe,
}
