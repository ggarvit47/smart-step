const User = require("../models/userModel");

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


const signup = async (req, res) => {
  try {
    const { fullName, email, password, dob} = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ fullName, email, password,dob });
    await newUser.save();
    // You may customize the user data you want to send along with the token
    const userDataToSend = {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      dob:newUser.dob
      // Add any other user data you want to include here
    };

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    }); 
    return res.status(201).json({ message: "User created successfully",token, user: userDataToSend});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if the password is correct
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Password is correct, generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    }); 

       // Customize user data to be sent in response
       const userDataToSend = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        dob:user.dob
        // Add any other user data you want to include here
      };
    
   return res.status(200).json({ message: "Login successful", token, user: userDataToSend  });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: err.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a password reset token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    // Send password reset email (replace with your email sending logic)
    const transporter = nodemailer.createTransport({
      service: `${process.env.NODEMAILER_EMAIL_SERVICE}`,
      auth: {
        user: `${process.env.NODEMAILER_EMAIL}`,
        pass: `${process.env.NODEMAILER_EMAIL_SECRET_KEY}`,
      },
    });
    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      text: `Reset your password using this token: ${token}`,
    });

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find user by token's userId
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// const completeUserProfile = async (req, res) => {
//   try {
//     const userId = req.userId; // Assuming you're storing the user ID in the request object after authentication

//     // Fetch the existing user data from the database
//     const existingUser = await User.findById(userId);

//     if (!existingUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const {
//       fullName,
//       email,
//       phoneNumber,
//       dob,
//       nationality,
//       academicBackground,
//       studyPreferences,
//       studyGoalsAndCareerAspirations,
//       additionalInformation,
//       consentAndAgreement,
//     } = req.body;

//     // if (!req.body.fullName) {
//     //   existingUser.fullName = req.body.fullName;
//     // }
//     // if (!req.body.email) {
//     //   existingUser.email = req.body.email;
//     // }
//     // if (req.body.phoneNumber) {
//     //   existingUser.phoneNumber = req.body.phoneNumber;
//     // }
//     existingUser.fullName = fullName;
//     existingUser.email = email;
//     existingUser.phoneNumber = phoneNumber;
//     existingUser.dob = dob;
//     existingUser.nationality = nationality;
//     existingUser.academicBackground = academicBackground;
//     existingUser.studyPreferences = studyPreferences;
//     existingUser.studyGoalsAndCareerAspirations = studyGoalsAndCareerAspirations;
//     existingUser.additionalInformation = additionalInformation;
//     existingUser.consentAndAgreement = consentAndAgreement;

//     await existingUser.save();

//     await existingUser.save();

//     return res.status(200).json({ message: 'User profile updated successfully' });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };


const completeUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const {
      fullName,
      email,
      phoneNumber,
      dob,
      nationality,
      academicBackground,
      studyPreferences,
      universityPreferences, 
      studyGoalsAndCareerAspirations,
      additionalInformation,
      consentAndAgreement,
    } = req.body;

    // Update fields only if they are provided in the request body
    if (fullName) {
      existingUser.fullName = fullName;
    }
    if (email) {
      existingUser.email = email;
    }
    if (phoneNumber) {
      existingUser.phoneNumber = phoneNumber;
    }
    if (dob) {
      existingUser.dob = dob;
    }
    if (nationality) {
      existingUser.nationality = nationality;
    }
    if (academicBackground) {
      existingUser.academicBackground = academicBackground;
    }
    if (studyPreferences) {
      existingUser.studyPreferences = studyPreferences;
    }
    if (universityPreferences) { // Update universityPreferences if provided
      existingUser.universityPreferences = universityPreferences;
    }
    if (studyGoalsAndCareerAspirations) {
      existingUser.studyGoalsAndCareerAspirations = studyGoalsAndCareerAspirations;
    }
    if (additionalInformation) {
      existingUser.additionalInformation = additionalInformation;
    }
    if (consentAndAgreement) {
      existingUser.consentAndAgreement = consentAndAgreement;
    }

    await existingUser.save();

    return res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getUserProfile = async(req,res) =>{
  try {
 
const userId = req.userId;

// Assuming you're using Mongoose, fetch the user by userId
const user = await User.findById(userId);
  if(!user){
        return res.send({message:"User not found"})
  }
  const filteredUser = filterUser(user.toObject());
  return res.send({user:filteredUser})
    
  } catch (error) {
    return res.send({error:error.message})
    
  }
}

function filterUser(user) {
  const filteredUser = {};

  // Iterate through the keys of user object
  for (const key in user) {
    // Exclude Mongoose internal properties
    if (!key.startsWith("$") && !key.startsWith("_")) {
      // If the value is an object and not null, recursively filter its nested fields
      if (typeof user[key] === "object" && user[key] !== null && !isCircular(user[key])) {
        const filteredNested = filterUser(user[key]);
        if (Object.keys(filteredNested).length !== 0) {
          filteredUser[key] = filteredNested;
        }
      }
      // Exclude null or empty values
      else if (user[key] !== null && user[key] !== undefined && user[key] !== "") {
        filteredUser[key] = user[key];
      }
    }
  }

  return filteredUser;
}


// Helper function to check for circular references
function isCircular(obj) {
  const seen = new WeakSet();

  function detect(obj) {
    if (typeof obj !== "object" || obj === null) {
      return false;
    }

    if (seen.has(obj)) {
      return true;
    }

    seen.add(obj);

    for (const key in obj) {
      if (obj.hasOwnProperty(key) && detect(obj[key])) {
        return true;
      }
    }

    return false;
  }

  return detect(obj);
}










module.exports = { signup, login, forgetPassword, resetPassword, completeUserProfile, getUserProfile };
