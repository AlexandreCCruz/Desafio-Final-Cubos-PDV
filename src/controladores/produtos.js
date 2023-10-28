const knex = require("../conexao");

const cadastrarProdutos = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const categoriaEncontrada = await knex("categorias").where({ id: categoria_id }).first();
        const CategoriaNome = await knex("categorias").where({ id: categoria_id })

        if (!categoriaEncontrada) {
            return res.status(404).json("A categoria_id informada não existe.");
        }

        await knex("produtos")
            .insert({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id
            })

        let objetoFormatado;

        for (const item of CategoriaNome) {
            objetoFormatado = {
                Categoria: item.descricao,
                descricao,
                quantidade_estoque,
                valor,
                categoria_id
            }
        }

        return res.status(200).json(objetoFormatado);

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    cadastrarProdutos
};