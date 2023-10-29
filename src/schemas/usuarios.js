const joi = require('joi')

const schemaCorpoUsuario = joi.object({
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
    senha: joi.string().min(5).required().messages({
        'any.required': 'O campo (senha) é obrigatório',
        'string.empty': 'O campo (senha) não pode ser vazio',
        'string.min': 'O campo (senha) deve ter no minimo 5 caracters'
    })
})

module.exports = {
    schemaCorpoUsuario
}

