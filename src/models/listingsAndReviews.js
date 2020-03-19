const mongoose = require('mongoose');
<<<<<<< HEAD
const { Schema } = mongoose;

const listingsAndReviews = new Schema({
    _id: { type: Number },
    name: { type: String },
    description: { type: String },
    idCustomer: { type: Number }
});

=======
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
>>>>>>> 400635a44abcf58acc07862b55d7586bcfc1234a

module.exports = mongoose.model('listingsAndReviews', listingsAndReviews);