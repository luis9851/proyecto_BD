const express=require('express');
const mysql=require('mysql');
const app=express();
const port=3000;
/////coneccion a mysql
const connection=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'pokemon',
});

app.get('/',function(req,res){
    res.send('Bienvenido al sitio');
});
app.get('/imag',function(req,res){
    res.send('<img width=100% height=100% src="https://www.xtrafondos.com/wallpapers/halo-5-guardians-2986.jpg"></img>');
});
app.post('/',function(req,res){
    res.send('Ahora fue una llamada POST');
});

app.get('/suma/:num1/:num2',function(req,res){
    var suma=0;
    var numero1;
    var numero2;
    numero1=parseInt(req.params['num1']);
    numero2=parseInt(req.params['num2']);
    suma=numero1+numero2;
    res.send('La suma es: '+suma);
});

app.get('/saludo/:nombre/:apellido',function(req,res){
    res.send('Hola'+req.params['nombre']+' '+req.params['apellido']);
});

var jsonObj={
    nombre:"Juanito",
    edad:19,
    pais:"Mexico"
};

app.get('/json', function(req,res){
    res.json(jsonObj);
});

app.get('/error',function(req,res){
    res.status(401).json({
        error:401,
        message:'No puedes ver ésto'
    });
});
/////muestra los datos de la base de datos
app.get('/mysql',function(req,res){
    connection.query('SELECT *FROM pokemon',function(err,rows,fields){
        if(err) throw err
        console.log('Los resultados son:', rows);
        res.send(rows);
    })
});
app.get('/mysql/pokemon',function(req,res){
    connection.query('SELECT *FROM pokemon',function(err,rows,fields){
        if(err) throw err
        console.log('Los resultados son:', rows);
        res.send(rows);
    })
});
app.listen(port,function(){
    console.log('El servidor esta corriendo');
})
