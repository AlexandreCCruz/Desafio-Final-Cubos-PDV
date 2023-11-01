const knex = require('../conexao');

const validarEditarDadosCliente = async (req,res,next) => {
    const {nome,email,cpf} = req.body;
    const {id} = req.params
    const idEncontrado = await knex("clientes").where({ id }).first();

    if (cpf.length != 11) {
        return res.status(400).json("Deve ser informado um cpf válido");
    }

    if (!idEncontrado) {
        return res.status(404).json("Não existe um cliente para o id informado");
    }

    const validarEmail = await knex('clientes').where({email}).first()
    const validarCpf = await knex('clientes').where({cpf}).first()

    if (validarEmail && validarEmail.id != id) {
        return res.status(409).json("Esse email já está cadastrado");
    }

    if (validarCpf && validarCpf.id != id) {
        return res.status(409).json("Esse cpf já está cadastrado");
    }

    req.idEncontrado = idEncontrado
    return next();
}


module.exports = {
    validarEditarDadosCliente
}