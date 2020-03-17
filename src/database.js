const mongoose = require('mongoose');
//////////////////////////////////////nombre de la base de datos
mongoose.connect('mongodb://localhost/notes-db-app',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));