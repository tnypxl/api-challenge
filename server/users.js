const db = require('../db') //this is required
const Review = require('../db/models/review');
const Product = require('../db/models/product');
const User = require('../db/models/user');

const router = require('express').Router()

router.get('/', function(req, res, next) {
  User.findAll()
    .then(result => res.status(200).send(result))
    .catch(error => res.status(404).send(error));
});

router.get('/:id', function(req, res, next) {
  User.findOne({
    where:{id:req.params.id},
    include: [Review]
  })
    .then(result => res.status(200).send(result))
    .catch(error => res.status(404).send(error));
});

router.get('/:id/reviews', function(req, res, next) {
  User.findOne({
      where:{id:req.params.id},
      include: [Review]
    })
    .then(result => res.status(200).send(result.reviews))
    .catch(error => res.status(404).send(error));
});

router.get('/:id/product', function(req, res, next) {
  User.findOne({
      where:{id:req.params.id},
      include: [Product]
    })
    .then(result => res.status(200).send(result.products))
    .catch(error => res.status(404).send(error));
});

module.exports = router;