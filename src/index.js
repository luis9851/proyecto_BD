const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
//Initializations
const app=express();
//Settings
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride())

//Global Variables

//Routes

//Static Files

//Server is listenning
app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'));
});