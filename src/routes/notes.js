const express = require('express');
const router = express.Router();

router.get('/notes/add',(req,res)=>{
    res.render('notes/new-note');
});
router.post('/notes/new-note', (req,res)=>{
    const {title,description}=req.body;
    const errors=[];
    if(!title){
        errors.push({text:'Pleace write a Title'});
    }
    if(!description){
        errors.push({text:'Pleace write a Description'});
    }
    if(errors.length>0){
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    }else{
        res.send('ok');
    }
});
router.get('/notes',(req,res)=>{
    res.send('Notes from database');
});

module.exports = router;