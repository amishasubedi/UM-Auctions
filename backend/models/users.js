const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    UserID: {
        type: Number,
        require: true
    },
    Username: {
        type: String,
        require: true
    },
    Payment: {
        type: Number,
        require: false
    },
    DeliveryAddress: {
        type: String,
        require: false
    },
    Email: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("User", UserSchema);