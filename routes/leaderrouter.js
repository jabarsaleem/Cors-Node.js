const express = require('express');

const bodyparser = require('body-parser');

const cors = require('./cors');
const mongoose = require('mongoose');

const Leaders = require('../models/leaders');
const { findById } = require('../models/leaders');

const auth= require('../auth');


const LeaderRouter = express.Router();

LeaderRouter.use(bodyparser.json());

LeaderRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.corsWithOptions,(req, res, next) => {
        Leaders.find({})
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leaders);

            }, (err) => next(err))
            .catch((err) => next(err));

    })

    .put(cors.corsWithOptions,auth.verifyUser,(req, res, next) => {

        res.statusCode = 403;
        res.end("this operation is invaild");

    })
    .post(cors.corsWithOptions,auth.verifyUser,(req, res, next) => {
        Leaders.create(req.body)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);

            }, (err) => next(err))
            .catch((err) => next(err));


    })

    .delete(cors.corsWithOptions,auth.verifyUser,(req, res, next) => {

        Leaders.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);

            }, (err) => next(err))
            .catch((err) => next(err));

    });
LeaderRouter.route('/:leaderid')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.corsWithOptions,(req, res, next) => {

        Leaders.findById(req.params.leaderid).then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);

        }, (err) => next(err))
            .catch((err) => next(err));
    })

    .delete(cors.corsWithOptions,auth.verifyUser,(req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderid).then((reps) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(reps);

        }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post(cors.corsWithOptions,auth.verifyUser,(req, res, next) => {

        res.statusCode = 403;
        res.end("this operation is invaild");

    })
    .put(cors.corsWithOptions,auth.verifyUser,(req, res, next) => {

        Leaders.findByIdAndUpdate(req.params.leaderid, { $set: req.body }, { new: true }).then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);

        }, (err) => next(err))
            .catch((err) => next(err));
    });



module.exports = LeaderRouter;