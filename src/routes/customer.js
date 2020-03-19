const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer.js');
const Listings = require('../models/listingsAndReviews.js');

<<<<<<< HEAD
=======
//Cargar vista de customers con find()
>>>>>>> 400635a44abcf58acc07862b55d7586bcfc1234a
router.get('/customer/add', (req, res) => {
    res.render('customer/newCustomer');
});

<<<<<<< HEAD
=======
//Añadir nuevos customers
>>>>>>> 400635a44abcf58acc07862b55d7586bcfc1234a
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
<<<<<<< HEAD
        await newCustomer.save();
=======
        await newCustomer.save(); //Guarda los datos
>>>>>>> 400635a44abcf58acc07862b55d7586bcfc1234a
        req.flash('success_msg', 'Customer Agregado');
        res.redirect('/customer');
    }
});

<<<<<<< HEAD
router.get('/customer', async(req, res) => {
    const customers = await Customer.find();
    res.render('customer/allCustomers', { customers });
});

=======
//Sentencia find()
router.get('/customer', async(req, res) => {
    const customers = await Customer.find();
    res.render('customer/allCustomers', { customers }); //Renderiza todo en la vista allCustomers
});

//Lleva todos los datos del customer a actualizar, a la vista de update
>>>>>>> 400635a44abcf58acc07862b55d7586bcfc1234a
router.get('/customer/edit/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id);
    res.render('customer/editCustomer', { customer });
});

<<<<<<< HEAD
=======
//Sentencia findByIdAndUpdate()
>>>>>>> 400635a44abcf58acc07862b55d7586bcfc1234a
router.put('/customer/editCustomer/:id', async(req, res) => {
    const { FirstName, LastName, address, city, country, district, status } = req.body;
    await Customer.findByIdAndUpdate(req.params.id, { FirstName, LastName, address, city, country, district, status });
    req.flash('success_msg', 'Customer Actualizado');
    res.redirect('/customer');
});

<<<<<<< HEAD
=======
//Eliminar el cliente por id
>>>>>>> 400635a44abcf58acc07862b55d7586bcfc1234a
router.delete('/customer/delete/:id', async(req, res) => {
    await Customer.findByIdAndRemove(req.params.id);
    req.flash('success_msg', 'Customer Eliminado');
    res.redirect('/customer');
});

<<<<<<< HEAD
=======
//Muestra todos los clientes en la vista de deleteCustomers
>>>>>>> 400635a44abcf58acc07862b55d7586bcfc1234a
router.get('/customer/delete', async(req, res) => {
    const customers = await Customer.find();
    res.render('customer/deleteCustomers', { customers });
});

<<<<<<< HEAD
=======
//Muestra en la vista de searchCustomers todos los customers
>>>>>>> 400635a44abcf58acc07862b55d7586bcfc1234a
router.get('/customer/search', async(req, res) => {
    const customers = await Customer.find();
    res.render('customer/searchCustomers', { customers });
});

<<<<<<< HEAD
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
//6
router.get('/customer/rentals', async(req, res) => {
    const acollection = Listings.collection.collectionName;
    const look = await Customer.aggregate([{
        $lookup: {
            from: acollection,
=======
//Busca por ID
router.get('/customer/searchID/:id', async(req, res) => {
    const customers = await Customer.find({ "_id": req.params.id });
    res.render('customer/searchCustomers', { customers });
});

//Busca por Nombre
router.get('/customer/searchName/:FirstName', async(req, res) => {
    const customers = await Customer.find({ "FirstName": req.params.FirstName });
    res.render('customer/searchCustomers', { customers });
});

//Busca por Pais
router.get('/customer/searchCountry/:country', async(req, res) => {
    const customers = await Customer.find({ "country": req.params.country });
    res.render('customer/searchCustomers', { customers });
});

//Genera la relacion entre customers y listingsAndReviews
router.get('/customer/rentals', async(req, res) => {
    const colle = Listings.collection.collectionName;
    const look = await Customer.aggregate([{
        $lookup: {
            from: colle,
>>>>>>> 400635a44abcf58acc07862b55d7586bcfc1234a
            localField: '_id',
            foreignField: 'idCustomer',
            as: 'Rentals'
        }
    }]);
    res.json(look);
<<<<<<< HEAD
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
//7
router.get('/customer/reportRe', async(req,res)=>{
    const acollection = Listings.collection.collectionName;
    const lis = await Listings.find({$where:"this.idCustomer>0"});
    res.json(lis);
});
=======
    res.send(look);;
});

//Propiedades rentadas 
router.get('/customer/rentalsPro', async(req, res) => {
    const lis = await Listings.find({ "idCustomer": { $gte: 0 } });
    res.json(lis);
});


//Insert en listingsAndReviews
router.get('/customer/hola', async(req, res) => {
    const look = await Listings.insertMany([{
        name: "Casa menos chida",
        description: "Esta menos chida, pero esta chida aun asi",
        price: 200,
        property_type: "Casa",
        idCustomer: 66
    }]);
    res.json(look);
});

>>>>>>> 400635a44abcf58acc07862b55d7586bcfc1234a
//9
router.get('/customer/reportRe', async(req,res)=>{
    const acollection = Listings.collection.collectionName;
    const lis = await Listings.find({$and:[{"price":{$gte:80}},{"price":{$lte:5000}}]});
    res.json(lis);
});
<<<<<<< HEAD
=======

>>>>>>> 400635a44abcf58acc07862b55d7586bcfc1234a
module.exports = router;