const jwt = require('jsonwebtoken');
const chaveToken = require('../seguranca');
const knex = require('../conexao');

async function verificaUsuarioLogado(req, res, next) {
    const { authorization } = req.headers;
    if (authorization.split(' ').length == 1) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
    }
    try {
        const token = authorization.split(' ')[1];
        const verificacaoToken = jwt.verify(token, chaveToken);
        const { id } = verificacaoToken;
        const verificarUsuarioExiste = await knex('usuarios').where('id', id);
        delete verificarUsuarioExiste[0].senha;
        req.usuario = verificarUsuarioExiste[0];
        return next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

module.exports = verificaUsuarioLogado