const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer.js');
const Listings = require('../models/listingsAndReviews.js');

router.get('/customer/add', (req, res) => {
    res.render('customer/newCustomer');
});

router.post('/customer/newCustomer', async(req, res) => {
    const { FirstName, LastName, address, city, country, district, status } = req.body;
    const errors = [];
    if (!FirstName || !LastName || !address || !city || !country || !district || !status) {
        errors.push({ text: 'Falta llenar algun campo' });
    }
    if (errors.length > 0) {
        res.render('customer/newCustomer', {
            errors,
            FirstName,
            LastName,
            address,
            city,
            country,
            district,
            status
        });
    } else {
        const newCustomer = new Customer({ FirstName, LastName, address, city, country, district, status });
        await newCustomer.save();
        req.flash('success_msg', 'Customer Agregado');
        res.redirect('/customer');
    }
});

router.get('/customer', async(req, res) => {
    const customers = await Customer.find();
    res.render('customer/allCustomers', { customers });
});

router.get('/customer/edit/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id);
    res.render('customer/editCustomer', { customer });
});

router.put('/customer/editCustomer/:id', async(req, res) => {
    const { FirstName, LastName, address, city, country, district, status } = req.body;
    await Customer.findByIdAndUpdate(req.params.id, { FirstName, LastName, address, city, country, district, status });
    req.flash('success_msg', 'Customer Actualizado');
    res.redirect('/customer');
});

router.delete('/customer/delete/:id', async(req, res) => {
    await Customer.findByIdAndRemove(req.params.id);
    req.flash('success_msg', 'Customer Eliminado');
    res.redirect('/customer');
});

router.get('/customer/delete', async(req, res) => {
    const customers = await Customer.find();
    res.render('customer/deleteCustomers', { customers });
});

router.get('/customer/search', async(req, res) => {
    const customers = await Customer.find();
    res.render('customer/searchCustomers', { customers });
});

router.get('/customer/search/searchbyID/:id', async(req, res) => {
    const customers = await Customer.find({ "_id": req.params.id });
    console.log(res.params.id);
    res.render('customer/searchCustomers', { customers });
});

router.get('/customer/searchN/:FirstName', async(req, res) => {
    const customers = await Customer.find({ "FirstName": req.params.FirstName });
    console.log(req.params.FirstName);
    res.render('customer/searchCustomers', { customers });
});

router.get('/customer/search/searchbyCountry/:country', async(req, res) => {
    const customers = await Customer.find({ "country": req.params.country });
    console.log(res.params.country);
    res.render('customer/searchCustomers', { customers });
});

//-----------------------------Terminar esta parte --------------------------

router.get('/customer/rentals', async(req, res) => {
    const acollection = Listings.collection.collectionName;
    const look = await Customer.aggregate([{
        $lookup: {
            from: acollection,
            localField: '_id',
            foreignField: 'idCustomer',
            as: 'Rentals'
        }
    }]);
    res.json(look);
});
router.get('/customer/hola', async(req, res) => {
    const acollection = Listings.collection.collectionName;
    const look = await Listings.insertMany([{
        "_id": 5000,
        "name": "Chido",
        "description": "Mas chido",
        "idCustomer": 65
    }]);
    res.json(look);
});

module.exports = router;