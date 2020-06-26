const connection = require('../database/connection');
const crypto = require('crypto')
const  generate  = require('../config/business rules/RandowNumber')
const {existsOrError, notExistsOrError} = require('../config/validation')


module.exports ={

    async create(request, response){
        const {name, document, type} = request.body
        const id = crypto.randomBytes(4).toString('HEX');
        const score = generate.generateNumber(0, 10).toString()

        try{
            existsOrError(name, 'Nome não informado');
            existsOrError(document, 'Numero do cnpj ou cpf não informado');
            existsOrError(type, 'Tipo de Pessoa não informada'); 
            existsOrError(score, 'Score Não Gerado')  
            const getClient = await connection('client').where({document: document}).first()

            notExistsOrError(getClient, 'Cliente já cadastrado')
            
        }catch(msg){
            return response.status(400).send(msg);
        }

        await connection('client').insert({
            id,
            name,
            document,
            score,
            type
        })
           
        return response.json({id, type, score})
        
    },

    async index(request, response){
        const clients = await connection('client').select('*');
        return response.json(clients)
    }

}