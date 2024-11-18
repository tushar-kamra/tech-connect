const validator = require("validator");

const validateSignUp = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!validator.isByteLength(firstName, { min: 4, max: 20 })) {
        throw new Error("First name should be in the range of 4-20 characters");
    } else if (!validator.isEmail(email)) {
        throw new Error("Invalid email");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Weak password");
    }
};

module.exports = {
    validateSignUp,
};
