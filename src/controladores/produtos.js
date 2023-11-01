const knex = require("../conexao");

const cadastrarProdutos = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const categoriaEncontrada = await knex("categorias")
      .where({ id: categoria_id })
      .first();
    const CategoriaNome = await knex("categorias").where({ id: categoria_id });

    if (!categoriaEncontrada) {
      return res.status(404).json("A categoria_id informada não existe.");
    }

    await knex("produtos").insert({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    });

    let objetoFormatado;

    for (const item of CategoriaNome) {
      objetoFormatado = {
        Categoria: item.descricao,
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      };
    }

    return res.status(200).json(objetoFormatado);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const listarProdutos = async (req, res) => {
  let listagemProdutos;
  try {
    if (req.produtoFiltro) {
      listagemProdutos = await knex('produtos').where('categoria_id', 'in', req.produtoFiltro)
    } else {
      listagemProdutos = await knex('produtos');
    }
    return res.status(200).json(listagemProdutos)
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const selecionarProduto = await knex("produtos").where({ id }).first;

    if (!selecionarProduto) {
      return res.status.json("Não existe produto com o ID informado!");
    }

    const produtoDeletado = await knex("produtos").del().where({ id });

    if (!produtoDeletado) {
      return res.status(400).json("Não foi possível deletar o produto.");
    }

    return res.status(200).json("Produto deletado com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const detalharProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const selecionarProduto = await knex("produtos").where({ id }).first();
    if (!selecionarProduto) {
      return res.status(404).json("Não existe um produto para o id informado");
    }
    return res.status(200).json(selecionarProduto);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const selecionarProduto = await knex("produtos").where({ id }).first();
    if (!selecionarProduto) {
      return res.status(404).json("Não existe um produto para o ID informado");
    }

    const produto = {
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    };

    const produtoAtualizado = await knex("produtos")
      .update(produto)
      .where({ id })
      .returning('*');

    if (!produtoAtualizado) {
      return res
        .status(400)
        .json("Não foi possível atualizar os dados do produto.");
    }

    return res
      .status(200)
      .json(produtoAtualizado);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarProdutos,
  listarProdutos,
  detalharProduto,
  excluirProduto,
  atualizarProduto,
};
