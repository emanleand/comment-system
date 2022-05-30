'use strict';
const mongoose = require('mongoose');
const config = require('config');
const app = require('./app');

const port = config.get('port');
const { name_db, port_db, user_db, psw_db } = config.get('database');

mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(`mongodb://${user_db}:${psw_db}@localhost:${port_db}/${name_db}`, {
  useNewUrlParser: true,
  keepAlive: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('connection success');
    app.listen(port, () => {
      console.log('server ok');
    })
  })
  .catch((err) => {
    console.log(err);
  })