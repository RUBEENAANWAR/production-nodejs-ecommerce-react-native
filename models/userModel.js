import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "name is required"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already taken"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [4, "password length should be greater then 4 character"],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

//fuynctuions
// hash func
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

// compare function
userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

//JWT TOKEN
userSchema.methods.generateToken = function () {
  return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const userMdoel = mongoose.model("Users", userSchema);
export default userMdoel;