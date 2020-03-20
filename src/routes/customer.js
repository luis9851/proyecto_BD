const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer.js');
const Listings = require('../models/listingsAndReviews.js');

//Cargar vista de customers con find()
router.get('/customer/add', (req, res) => {
    res.render('customer/newCustomer');
});

//Añadir nuevos customers
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
        await newCustomer.save(); //Guarda los datos
        req.flash('success_msg', 'Customer Agregado');
        res.redirect('/customer');
    }
});

//Sentencia find()
router.get('/customer', async(req, res) => {
    const customers = await Customer.find();
    res.render('customer/allCustomers', { customers }); //Renderiza todo en la vista allCustomers
});

//Lleva todos los datos del customer a actualizar, a la vista de update
router.get('/customer/edit/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id);
    res.render('customer/editCustomer', { customer });
});

//Sentencia findByIdAndUpdate()
router.put('/customer/editCustomer/:id', async(req, res) => {
    const { FirstName, LastName, address, city, country, district, status } = req.body;
    await Customer.findByIdAndUpdate(req.params.id, { FirstName, LastName, address, city, country, district, status });
    req.flash('success_msg', 'Customer Actualizado');
    res.redirect('/customer');
});

//Eliminar el cliente por id
router.delete('/customer/delete/:id', async(req, res) => {
    await Customer.findByIdAndRemove(req.params.id);
    req.flash('success_msg', 'Customer Eliminado');
    res.redirect('/customer');
});

//Muestra todos los clientes en la vista de deleteCustomers
router.get('/customer/delete', async(req, res) => {
    const customers = await Customer.find();
    res.render('customer/deleteCustomers', { customers });
});

//Muestra en la vista de searchCustomers todos los customers
router.get('/customer/search', async(req, res) => {
    const customers = await Customer.find();
    res.render('customer/searchCustomers', { customers });
});

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
            localField: '_id',
            foreignField: 'idCustomer',
            as: 'Rentals'
        }
    }]);
    res.json(look);
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
//8
router.get('/customer/report8', async(req,res)=>{
    const acollection = Listings.collection.collectionName;
    const lis = await Listings.find({$or:[        
    {property_type:"Aparthotel"},
    {property_type:"Apartment"},
    {property_type:"Barn"},
    {property_type:"Bed and breakfast"},
    {property_type:"Boat"},
    {property_type:"Boutique hotel"},
    {property_type:"Bungalow"},
    {property_type:"Cabin"},
    {property_type:"Camper/RV"},
    {property_type:"Campsite"},
    {property_type:"Casa particular (Cuba)"},
    {property_type:"Castle"},
    {property_type:"Chalet"},
    {property_type:"Condominium"},
    {property_type:"Cottage"},
    {property_type:"Earth house"},
    {property_type:"Farm stay"},
    {property_type:"Guest suite"},
    {property_type:"Guesthouse"},
    {property_type:"Heritage hotel (India)"},
    {property_type:"Hostel"},
    {property_type:"Hotel"},
    {property_type:"House"},
    {property_type:"Houseboat"},
    {property_type:"Hut"},
    {property_type:"Loft"},
    {property_type:"Nature lodge"},
    {property_type:"Other"},
    {property_type:"Pension (South Korea)"},
    {property_type:"Resort"},
    {property_type:"Serviced apartment"},
    {property_type:"Tiny house"},
    {property_type:"Townhouse"},
    {property_type:"Train"},
    {property_type:"Treehouse"},
    {property_type:"Villa"}]});
    res.json(lis);
});
//9
router.get('/customer/report9', async(req,res)=>{
    const acollection = Listings.collection.collectionName;
    const lis = await Listings.find({$and:[{"price":{$gte:80}},{"price":{$lte:5000}}]});
    res.json(lis);
});
//10
router.get('/customer/act/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id);
    res.render('customer/newactivo', {customer});
});

router.put('/customer/newactivo/:id', async(req, res) => {
    var sta={"status":"Inactivo"}
    await Customer.findByIdAndUpdate(req.params.id, {sta});
    req.flash('success_msg', 'Customer Actualizado');
    res.redirect('/customer');
});

module.exports = router;