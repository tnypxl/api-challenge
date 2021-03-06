const db = require('../db'); //this is required
const Product = require('../db/models/product');
const Review = require('../db/models/review');
const router = require('express').Router();

router.get('/', function(req, res, next) {
  Product.findAll()
    .then(result => res.status(200).send(result))
    .catch(error => res.status(404).send(error));
});

router.get('/:id', function(req, res, next) {
  Product.findOne({
    where:{id:req.params.id},
    include: [Review]
  })
    .then(result => res.status(200).send(result))
    .catch(error => res.status(404).send(error));
});

router.get('/:id/reviews', function(req, res, next) {
  Product.findOne({
    where:{id:req.params.id},
    include: [Review]
  })
    .then(result => res.status(200).send(result.reviews))
    .catch(error => res.status(404).send(error));
});

module.exports = router;
