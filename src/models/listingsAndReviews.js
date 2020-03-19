const mongoose = require('mongoose');
const { Schema } = mongoose;

const listingsAndReviews = new Schema({
    _id: { type: Number },
    name: { type: String },
    description: { type: String },
    idCustomer: { type: Number }
});


module.exports = mongoose.model('listingsAndReviews', listingsAndReviews);