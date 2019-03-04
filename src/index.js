let express = require('express');
let app = express();

let personRoute = require('./routes/person');
let customerRoute = require('./routes/customer');

let path = require('path');
// order in which handlers are added matters
// executed serially

let bodyParser = require('body-parser');

// take in any incoming json string
// and creating an attribute called body
// can print body
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    next();
});
app.use(personRoute);
app.use(customerRoute);
app.use(express.static('public'));

// Handler for 404 - Resource not found
// Put at the end of the chain
app.use((req, res, next) => {
    res.status(404).send('We think you are lost!');
});

// Handler for Error 500
app.use((req, res, next) => {
    console.error(err.stack);
    res.sendFile(path.join(__dirname, '../public/500.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));