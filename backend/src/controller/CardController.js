const connection = require('../database/connection');
const { create } = require('./AccountController');
const {existsOrError, notExistsOrError} = require('../config/validation');
const { index } = require('./ClientController');

module.exports={
    async create(request, response){
        const { limit_credit, account_id} = request.body
        console.log(limit_credit, account_id)
        try{
            existsOrError(limit_credit, 'Cartão De Crédito Não Aprovado')
            existsOrError(account_id, 'Conta Não Informada')
        }catch(msg){
            return response.status(400).send(msg);
        }

        await connection('card').insert({
            limit_credit,
            account_id
        })
        return  response.status(204).send()
    },

    async index(request, response){
        const cards = await connection('card').select('*');
        return response.json(cards)
    }
}