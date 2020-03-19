const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer.js');


router.delete('/customer/deletebyname/:FirstName', async(req, res) => {
    await Customer.deleteMany({ "FirstName": req.params.FirstName });
    console.log(req.params.FirstName);
    req.flash('success_msg', 'Customer Eliminado');
    res.redirect('/customer');
});

router.delete('/customer/deletebyID/:id', async(req, res) => {
    await Customer.deleteOne({ "_id": req.params.id });
    console.log(req.params.id);
    req.flash('success_msg', 'Customer Eliminado');
    res.redirect('/customer');
});

module.exports = router;