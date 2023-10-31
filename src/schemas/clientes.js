const joi = require('joi')

const schemaCorpoCliente = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo (nome) é obrigatório',
        'string.empty': 'O campo (nome) não pode ser vazio',
        'any.required': 'O campo (nome) não pode ser vazio',
        'string.base': 'O campo (nome) não pode ser um número'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo (email) é obrigatório',
        'string.empty': 'O campo (email) não pode ser vazio',
        'any.required': 'O campo (email) não pode ser vazio',
        'string.base': 'O campo (email) não pode ser um número',
        'string.email': 'O campo (email) deve ser um email de padrão válido'
    }),
    cpf: joi.number().min(11).required().messages({
        'any.required': 'O campo (cpf) é obrigatório',
        'number.empty': 'O campo (cpf) não pode ser vazio',
        'number.min': 'O campo (cpf) deve ter no minimo 11 caracters',
        'number.base': 'O campo (cpf) não pode ser texto'
    })
})

module.exports = {
    schemaCorpoCliente
}