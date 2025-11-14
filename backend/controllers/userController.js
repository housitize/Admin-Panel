import express from "express";
import userModel from "../models/userModels.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import { sendEmailOtp } from "../utils/sendEmail.js";
// import sendSMS from "../utils/sendSMS.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRATE);
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

//Route for user login
const loginUser = async (req, res) => {
  // console.log("req.body", req.body);
  try {
    const { email, password , value, updatePassword } = req.body;

    // console.log("value", value);

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    if (value === "login") {
      // const isMatch = await bcrypt.compare(password, user.password);
      const isMatch = user.password === password;
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials" });
      }
    }

    if (updatePassword) {
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        return res
          .status(400)
          .json({
            success: false,
            message: "New password cannot be same as old password",
          });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await user.save();

    await sendEmailOtp(user.email, otp);
    // await sendSMS(`+91${user.phoneNumber}`, otp);

    const token = await createToken(user?._id);
    return res.status(200).json({
      success: true,
      message: "OTP sent",
      otpExpires: user.otpExpires,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Router for user registration
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, role } =
      req.body;

    //checking user already exist
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const phoneNumberExist = await userModel.findOne({ phoneNumber });
    if (phoneNumberExist) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number already exists" });
    }

    //validating email format and strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }
    if (phoneNumber.length < 10) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid phone number" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
      phoneNumber,
      roles: role || "user", // ✅ fallback to default
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const verifiedOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (user.otp === otp && user.otpExpires > new Date()) {
      user.isVerified = true;
      await user.save();
      const token = await createToken(user?._id);
      return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
        user,
        token,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req?.body?.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      orderAddress,
      userType,
      roles,
      aboutDeveloper,
    } = req.body;

    const user = await userModel.findById(req?.body?.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Update allowed fields only if provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (userType) user.userType = userType;
    if (roles) user.roles = roles;

    // ✅ Update password (hashed)
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // ✅ Update or append order address
    if (orderAddress) {
      // If `orderAddress` is an array, replace the existing one
      if (Array.isArray(orderAddress)) {
        user.orderAddress = orderAddress;
      } else {
        // If single address provided, push it to existing array
        user.orderAddress.push(orderAddress);
      }
    }

    // ✅ Update Developer Info (if applicable)
    if (aboutDeveloper) {
      user.aboutDeveloper = {
        description: aboutDeveloper.description || user.aboutDeveloper?.description || "",
        city: aboutDeveloper.city || user.aboutDeveloper?.city || "",
        experience: aboutDeveloper.experience ?? user.aboutDeveloper?.experience ?? 0,
      };
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const getAllDevelopers = async (req, res) => {
  try {
    const developers = await userModel.find({ roles: { $ne: "user" } }).populate("createdPropertyIds");
    return res.status(200).json({ success: true, developers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export { loginUser, registerUser, verifiedOtp, getUser, updateUser, getAllDevelopers };