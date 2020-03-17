const express=require('express');
const app= express();
const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');
const { ApolloServer, gql } = require('apollo-server');
const url='mongodb://localhost:27017';
const dbName='sample_airbnb';
const bodyParser=require('body-parser');
const client= new MongoClient(url,{useUnifiedTopology:true});
const port=3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.get('/',function(req,res){
    res.send('Inicio a MongoDB');
});

app.get('/airbnb',function(req,res){
    client.connect(function(err){
        if(err) throw err;
        var dbo=client.db(dbName);
        dbo.collection('listingsAndReviews').find({}).toArray(function(err,result){
            if(err) throw err;
            res.send(result);
            client.close();            
        });
    });
});

app.delete('/delete',function(req,res){
    client.connect(function(err){
        if(err) throw err;
        var dbo=client.db(dbName);
        var query=req.body.query;
        dbo.collection("alumnos").deleteOne(query,function(err, result){
            if(err) throw err;
            res.send("Documento borrado");
            client.close();
        });
    });
});

/*client.connect(function(err){
    assert.equal(null,err);
    console.log('');
    console.log('Connected successfull to server');
    console.log('');
    const db=client.db(dbName);
    client.close();
});*/
app.listen(port,function(){
    console.log('El servidor esta corriendo');
});