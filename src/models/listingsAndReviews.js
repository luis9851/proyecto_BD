const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
const { Schema } = mongoose;

const listingsAndReviews = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    property_type: { type: String },
    idCustomer: { type: Number }
});

listingsAndReviews.plugin(autoIncrement.plugin, {
    model: '_id',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('listingsAndReviews', listingsAndReviews);