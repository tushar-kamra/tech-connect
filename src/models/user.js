const mongoose = require("mongoose");
const validator = require("validator");

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

const User = mongoose.model("User", userSchema);

module.exports = User;
