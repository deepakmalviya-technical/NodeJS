const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        enum: ["Student", "Employed", "Bussiness"],
        default: ""
    },
    dob: {
        type: Date
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },
    bio: {
        type: String
    },
    profilePicture: {
        type: String,
        default:"noImage.jpeg"
    }
})

module.exports = mongoose.model("Customer", customerSchema)