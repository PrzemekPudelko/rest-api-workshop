let mongoose = require('mongoose');

const server = 'ds159025.mlab.com:59025';
const database = 'heroku_8z7g3xgz';
const user = 'user';
const password = 'password1';

mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`, { useNewUrlParser: true });
//mongoose.connect('mongodb://user:password1@ds159025.mlab.com:59025/heroku_8z7g3xgz');
let CustomerSchema = new mongoose.Schema({
   name: String,
   email: {
       type: String,
       require: true,
       unique: true,
   }
});

module.exports = mongoose.model('Customer', CustomerSchema);
