const mongoose = require ('mongoose');

const bidSchema =  new mongoose.Schema({
    customterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller"
    },
    city: {
        type: "String"
    },
    initialPrice: {
        type: Number
    },
    itemList: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number
            }
        }
    ],
    bids: [
        {
            biddingPrice: {
                type: Number
            },
            sellerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Seller"
            }
        }
    ],
    orderedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Bid",bidSchema);
