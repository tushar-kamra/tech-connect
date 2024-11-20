const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            minLength: 4,
            required: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid email id: " + value);
                }
            },
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            min: 18,
        },
        gender: {
            type: String,
            enum: ["male", "female", "others"],
        },
        about: {
            type: String,
            default: "This is the default bio!",
            maxLength: 500,
        },
        skills: {
            type: [String],
        },
        profilePhoto: {
            type: String,
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error("Invalid image URL: " + value);
                }
            },
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, "TechConnect@1234", {
        expiresIn: "7d",
    });

    return token;
};

userSchema.methods.validatePassword = async function (inputPassword) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(inputPassword, passwordHash);
    return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
