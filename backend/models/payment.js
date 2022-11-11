const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    UserID: {
        type: Number,
        require: true
    },
    Card: {
        type: Number,
        require: true
    },
    Name: {
        type: String,
        require: true
    },
    BillingAddress: {
        type: String,
        require: true
    },
    ExpirationDate: {
        type: Date,
        require: true
    },
    Cvc: {
        type: Number,
        require: true
    },
    CardType: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model("Payment", paymentSchema);