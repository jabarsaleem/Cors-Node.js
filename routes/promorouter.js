const express = require('express');

const bodyparser = require('body-parser');

const cors = require('./cors');
const mongoose = require('mongoose');

const promos = require('../models/promos');
const { findById } = require('../models/promos');

const PromoRouter = express.Router();

var auth = require('../auth');

PromoRouter.use(bodyparser.json());

PromoRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

    .get(cors.corsWithOptions, (req, res, next) => {
        promos.find({})
            .then((promos) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promos);

            }, (err) => next(err))
            .catch((err) => next(err));

    })

    .put(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {

        res.statusCode = 403;
        res.end("this operation is invaild");

    })
    .post(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
        promos.create(req.body)
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);

            }, (err) => next(err))
            .catch((err) => next(err));


    })

    .delete(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {

        promos.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);

            }, (err) => next(err))
            .catch((err) => next(err));

    });
PromoRouter.route('/:promoid')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

    .get(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {

        promos.findById(req.params.promoid).then((promo) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);

        }, (err) => next(err))
            .catch((err) => next(err));
    })

    .delete(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
        promos.findByIdAndRemove(req.params.promoid).then((reps) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(reps);

        }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {

        res.statusCode = 403;
        res.end("this operation is invaild");

    })
    .put(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {

        promos.findByIdAndUpdate(req.params.promoid, { $set: req.body }, { new: true }).then((promo) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);

        }, (err) => next(err))
            .catch((err) => next(err));
    });



module.exports = PromoRouter;