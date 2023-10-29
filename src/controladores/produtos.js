const { array } = require("joi");
const knex = require("../conexao");

const cadastrarProdutos = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const categoriaEncontrada = await knex("categorias").where({ id: categoria_id }).first();
        const CategoriaNome = await knex("categorias").where({ id: categoria_id })

        if (!categoriaEncontrada) {
            return res.status(404).json("A categoria_id informada não existe.");
        } //Passar essa validação para o intermediario

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

const listarProdutos = async (req,res) => {
    let listagemProdutos;
    try {
        if (req.produtoFiltro) {
            listagemProdutos = await knex('produtos').where('id','in',req.produtoFiltro)
        } else {
            listagemProdutos = await knex('produtos');
        }
        return res.status(200).json(listagemProdutos)
    } catch (error) {
        return res.status(400).json(error.message); 
    }
}


module.exports = {
    cadastrarProdutos,
    listarProdutos
};