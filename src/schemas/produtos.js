const joi = require('joi')

const schemaCorpoProdutos = joi.object({

    descricao: joi.string().required().messages({
        'any.required': 'O campo (descricao) é obrigatório',
        'string.empty': 'O campo (descricao) não pode ser vazio',
        'string.base': 'O campo (descricao) não pode ser um número'
    }),

    quantidade_estoque: joi.number().required().messages({
        'any.required': 'O campo (quantidade_estoque) é obrigatório',
        'string.empty': 'O campo (quantidade_estoque) não pode ser vazio',
        'number.base': 'O campo (quantidade_estoque) tem que ser um número'

    }),

    valor: joi.number().required().messages({
        'any.required': 'O campo (valor) é obrigatório',
        'string.empty': 'O campo (valor) não pode ser vazio',
        'number.base': 'O campo (valor) tem que ser um número'
    }),

    categoria_id: joi.number().required().messages({
        'any.required': 'O campo (categoria_id) é obrigatório',
        'string.empty': 'O campo (categoria_id) não pode ser vazio',
        'number.base': 'O campo (categoria_id) tem que ser um número'
    })
})

module.exports = {
    schemaCorpoProdutos
}

