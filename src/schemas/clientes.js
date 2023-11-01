const joi = require('joi');

const schemaCorpoCliente = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo (nome) é obrigatório',
        'string.empty': 'O campo (nome) não pode ser vazio',
        'string.base': 'O campo (nome) não pode ser um número'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo (email) é obrigatório',
        'string.empty': 'O campo (email) não pode ser vazio',
        'string.base': 'O campo (email) não pode ser um número',
        'string.email': 'O campo (email) deve ser um email de padrão válido'
    }),
    cpf: joi.string().required().messages({
        'any.required': 'O campo (cpf) é obrigatório',
        'string.empty': 'O campo (cpf) não pode ser vazio',
        'string.base': 'O campo (cpf) não pode ser texto'
    }),
    cep: joi.number().min(9999999).messages({
        'number.min': 'O campo (cep) deve ter no mínimo 8 caracteres'
    }),
    rua: joi.string(),
    numero: joi.number(),
    bairro: joi.string(),
    cidade: joi.string(),
    estado: joi.string()
});

module.exports = {
    schemaCorpoCliente
}