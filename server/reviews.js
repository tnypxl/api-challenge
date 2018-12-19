const db = require('../db') //this is required
const Review = require('../db/models/review');
const Product = require('../db/models/product');
const User = require('../db/models/user');

const router = require('express').Router()

router.get('/', function(req, res, next) {
  Review.findAll({
    include: [Product, User]
  })
    .then(result => res.status(200).send(result))
    .catch(error => res.status(404).send(error));
});

router.get('/:id', function(req, res, next) {
  Review.findOne({
    where:{id:req.params.id},
    include: [Product, User]
  })
    .then(result => res.status(200).send(result))
    .catch(error => res.status(404).send(error));
});

module.exports = router;
