const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const toJson = require("@meanie/mongoose-to-json");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Invalid email");
      },
    },
    password: {
      type: String,
      required: true,
      private: true,
      trim: true,
      minlength: 5,
      validate(value) {
        if (!validator.isStrongPassword(value))
          throw new Error(
            "Password should contain atleast a uppercase, a lowercase , a number and a special character",
          );
      },
    },
  },
  { timestamps: true },
);

userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
