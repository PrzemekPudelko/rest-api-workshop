let CustomerModel = require('../models/customer.model');
let express = require('express');
let router = express.Router();

// Create a new customer
// localhost:3000/customer
// Post Request
router.post('/customer', (req, res) => {
    // req.body
    // we have access to this because of body-parser
    if(!req.body) {
        // status code 400 = bad request
       return res.status(400).send('Request body is missing');
    }

    if(!req.body.email) {
        // ...
    }

    // The incoming object, what's being passed in req.body
    // let user = {
    //     name: 'firstname lastname',
    //     email: 'email@gmail.com'
    // };

    let model = new CustomerModel(req.body);
    model.save()
        .then(doc => {
        if(!doc || doc.length == 0) {
            return res.status(500).send(doc);
        }

        //201 means resource was created
        res.status(201).send(doc);
    })
        .catch(err => {
             res.status(500).json(err);
         });
});

//GET request
router.get('/customer', (req, res) => {
    if(!req.query.email) {
        return res.status(400).send('Missing URL parameter: email');
    }

    CustomerModel.findOne({
        email: req.query.email
    })
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//use to update customer in DB
//PUT request
router.put('/customer', (req, res) => {
    if(!req.query.email) {
        return res.status(400).send('Missing URL parameter: email');
    }

    CustomerModel.findOneAndUpdate({
        email: req.query.email
    }, req.body, {
        //returns the newly created object
        new: true
    })
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//DELETE request
// use to remove customer entry from DB
router.delete('/customer', (req, res) => {
    if(!req.query.email) {
        return res.status(400).send('Missing URL parameter: email');
    }

    CustomerModel.findOneAndRemove({
        email: req.query.email
    })
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;