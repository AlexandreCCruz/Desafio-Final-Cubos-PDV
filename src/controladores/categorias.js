const knex = require("../conexao");

const listarCategorias = async (req, res) => {
    try {
        const listar = await knex("categorias")
        // console.log(listar)
        return res.status(200).json(listar)

    } catch (error) {
        // console.log(error)
        return res.status(500).json({ mensagem: `Erro interno do servidor` });
    }
}

module.exports = {
    listarCategorias
}