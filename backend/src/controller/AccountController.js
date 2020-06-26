const connection = require('../database/connection');
const crypto = require('crypto')
const generate  = require('../config/business rules/RandowNumber')
const {validateAccountType} = require('../config/business rules/SetTypeAccount')
const {notExistsOrError} = require('../config/validation')
const {credit} = require('../config/business rules/CreditLimit');
const { index } = require('./ClientController');

module.exports ={

    async create(request, response){
        const {  agency, type, client_id, score } = request.body

        const number = generate.generateNumber(111111, 888888).toString()
        const type_account = validateAccountType(type)
        const id = crypto.randomBytes(4).toString('HEX');

        const checkLimitCredit = credit(parseInt(score))
        const overdraft = checkLimitCredit.check
        const limit_credit = checkLimitCredit.card

        try{
            const getId = await connection('account').where({client_id: client_id}).first()
            notExistsOrError(getId, 'Cliente Já Possui Uma Conta.');
        }catch(msg){
            return response.status(400).send(msg);
        }

        await connection('account').insert({
            id,
            number,
            agency,
            type_account,
            client_id,
            overdraft
            
        })
       return response.json({id, limit_credit})

    },

    async index(request, response){
        const acconut = await connection('account').select('*');
        return response.json(acconut)
    }
}