'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT  || 3999;

const user = 'ali';
const psw = 'ali123';

mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://' + user + ':' + psw + '@localhost:27017/forum_api_rest?authSource=admin', { useNewUrlParser: true })
.then(() => {
    console.log('connection success');
    app.listen(port ,()=>{
        console.log('server ok');
    })
})
.catch((err)=>{
    console.log(err);
})