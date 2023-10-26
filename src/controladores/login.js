const bcrypt = require('bcrypt');
const knex = require('../conexao');
const jwt = require('jsonwebtoken')
const senhaHash = require('../seguranca')

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await knex('usuarios')
            .where({ email }).first();

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

        if (!senhaCorreta || !usuario) {
            return res.status(400).json('Email e senha não confere')
        }

        const token = jwt.sign({ id: usuario.id }, senhaHash, { expiresIn: "12h" })

        const { senha: _, ...dadosUsuario } = usuario

        return res.status(200).json({
            usuario: dadosUsuario,
            token: token
        })

    } catch (erro) {
        return res.status(400).json(erro.message);
    }

}


module.exports = login