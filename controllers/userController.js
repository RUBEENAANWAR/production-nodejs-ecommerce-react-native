import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
    try {
      const { fullname,name, email, password } =
        req.body;
      // validation
    //   if (
    //     !fullname ||
    //     !name ||
    //     !email ||
    //     !password
    //   ) {
    //     return res.status(500).send({
    //       success: false,
    //       message: "Please Provide All Fields",
    //     });
    //   }
      //check exisiting user
      const exisitingUSer = await userModel.findOne({ email });
    //   validation
      if (exisitingUSer) {
        return res.status(500).send({
          success: false,
          message: "email already taken",
        });
      }
      const user = await userModel.create({
        fullname,
        name,
        email,
        password,
      });
      res.status(201).send({
        success: true,
        message: "Registeration Success, please login",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Register API",
        error,
      });
    }
  };


  //LOGIN
export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(500).send({
          success: false,
          message: "Please Add Email OR Password",
        });
      }
      // check user
      const user = await userModel.findOne({ email });
      //user valdiation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User Not Found",
        });
      }
      //check pass
      const isMatch = await user.comparePassword(password);
      //valdiation pass
      if (!isMatch) {
        return res.status(500).send({
          success: false,
          message: "invalid credentials",
        });
      }
      //teken
      const token = user.generateToken();
  
      res
        .status(200)
        .cookie("token", token, {
          expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          secure: process.env.NODE_ENV === "development" ? true : false,
          httpOnly: process.env.NODE_ENV === "development" ? true : false,
          sameSite: process.env.NODE_ENV === "development" ? true : false,
        })
        .send({
          success: true,
          message: "Login Successfully",
          token,
          user,
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: "false",
        message: "Error In Login Api",
        error,
      });
    }
  };

  // GET USER PROFILE
export const getUserProfileController = async (req, res) => {
    try {
      const user = await userModel.findById(req.user._id);
      user.password = undefined;
      res.status(200).send({
        success: true,
        message: "User Profile Fetched Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Profile API",
        error,
      });
    }
  };

  // LOGOUT
export const logoutController = async (req, res) => {
    try {
      res
        .status(200)
        .cookie("token", "", {
          expires: new Date(Date.now()),
          secure: process.env.NODE_ENV === "development" ? true : false,
          httpOnly: process.env.NODE_ENV === "development" ? true : false,
          sameSite: process.env.NODE_ENV === "development" ? true : false,
        })
        .send({
          success: true,
          message: "Logout Successfull",
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Logout API",
        error,
      });
    }
  };

  // UPDATE USER PROFILE
export const updateProfileController = async (req, res) => {
    try {
      const user = await userModel.findById(req.user._id);
      const { name,fullname, email} = req.body;
      // validation + Update
      if (name) user.name = name;
      if (email) user.email = email;
      if (fullname) user.fullname = fullname;
      //save user
      await user.save();
      res.status(200).send({
        success: true,
        message: "User Profile Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In update profile API",
        error,
      });
    }
  };

  // update user passsword
export const udpatePasswordController = async (req, res) => {
    try {
      const user = await userModel.findById(req.user._id);
      const { oldPassword, newPassword } = req.body;
      //valdiation
      if (!oldPassword || !newPassword) {
        return res.status(500).send({
          success: false,
          message: "Please provide old or new password",
        });
      }
      // old pass check
      const isMatch = await user.comparePassword(oldPassword);
      //validaytion
      if (!isMatch) {
        return res.status(500).send({
          success: false,
          message: "Invalid Old Password",
        });
      }
      user.password = newPassword;
      await user.save();
      res.status(200).send({
        success: true,
        message: "Password Updated Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In update password API",
        error,
      });
    }
  };
  