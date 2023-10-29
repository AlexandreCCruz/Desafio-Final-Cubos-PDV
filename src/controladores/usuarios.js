const knex = require("../conexao");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const emailEncontrado = await knex("usuarios").where({ email }).first();

    if (emailEncontrado) {
      return res.status(400).json("O email já existe");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await knex("usuarios")
      .insert({
        nome,
        email,
        senha: senhaCriptografada,
      })
      .returning(["nome", "email"]);

    if (!usuario) {
      return res.status(400).json("O usuário não foi cadastrado.");
    }

    return res.status(200).json(usuario[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const detalharPerfilUsuario = async (req, res) => {
  return res.status(200).json(req.usuario);
};

const atualizarPerfilUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const id = req.usuario.id;
  try {
    const emailEncontrado = await knex("usuarios").where({ email }).first();
    if (emailEncontrado && emailEncontrado.email !== req.usuario.email) {
      return res.status(400).json("O email já existe");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await knex("usuarios")
      .update({
        nome,
        email,
        senha: senhaCriptografada,
      })
      .where({ id })
      .returning(["nome", "email"]);

    if (!usuario) {
      return res
        .status(400)
        .json("Um ou mais dados do usuário não foram atualizados.");
    }

    return res.status(200).json(usuario[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarUsuario,
  detalharPerfilUsuario,
  atualizarPerfilUsuario,
};
