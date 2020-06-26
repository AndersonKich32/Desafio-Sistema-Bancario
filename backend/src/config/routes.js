const express = require('express')

const ClientController = require('../controller/ClientController')
const AccountController = require('../controller/AccountController')
const CardController = require('../controller/CardController')

const routes = express.Router()

routes.post('/client', ClientController.create);
routes.get('/client', ClientController.index);

routes.post('/account', AccountController.create); 
routes.get('/account', AccountController.index);

routes.post('/account/card', CardController.create);
routes.get('/account/card', CardController.index);

module.exports = routes;