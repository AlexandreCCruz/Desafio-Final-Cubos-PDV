const knex = require('../conexao');

const validarAlterarCliente = async (req,res,next) => {
    const {nome,email,cpf} = req.body;
    const {id} = req.params
    const idEncontrado = await knex("clientes").where({ id }).first();
    if (!idEncontrado) {
        return res.status(404).json("Não existe um cliente para o id informado");
    }
    if (idEncontrado.nome != nome || idEncontrado.email != email || idEncontrado.cpf != cpf) {
        return res.status(404).json("Os campos (nome,email,cpf) não conferem com o usuário");
    }
    req.idEncontrado = idEncontrado
    return next();
}


module.exports = {
    validarAlterarCliente
}