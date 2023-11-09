const knex = require("../conexao");
const aws = require("aws-sdk");

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);

const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.APP_KEY,
  },
});

const cadastrarProdutos = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const categoriaEncontrada = await knex("categorias")
      .where({ id: categoria_id })
      .first();
    const categoriaNome = await knex("categorias").where({ id: categoria_id });

    if (!categoriaEncontrada) {
      return res.status(404).json("A categoria_id informada não existe.");
    }

    if (req.file) {
      const { originalname, buffer, mimetype } = req.file;

      const imagem = await s3
        .upload({
          Bucket: process.env.BLACKBLAZE_BUCKET,
          Key: originalname,
          Body: buffer,
          ContentType: mimetype,
        })
        .promise();

      await knex("produtos").insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem: imagem.Location,
      });

      let objetoFormatado;

      for (const item of categoriaNome) {
        objetoFormatado = {
          categoria: item.descricao,
          descricao,
          quantidade_estoque,
          valor,
          categoria_id,
          produto_imagem: imagem.Location,
        };
      }

      return res.status(200).json(objetoFormatado);
    }

    await knex("produtos").insert({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    });

    let objetoFormatado;

    for (const item of categoriaNome) {
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
      listagemProdutos = await knex("produtos").where(
        "categoria_id",
        "in",
        req.produtoFiltro
      );
    } else {
      listagemProdutos = await knex("produtos");
    }
    return res.status(200).json(listagemProdutos);
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

    const pedidoComProduto = await knex("pedido_produto").where('produto_id', id).select('produto_id');

    if (pedidoComProduto.length > 0) {
      return res.status(400).json("O produto não pode ser deletado pois á pedidos com ele")
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

const editarDadosProduto = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const selecionarProduto = await knex("produtos").where({ id }).first();
    if (!selecionarProduto) {
      return res.status(404).json("Não existe um produto para o ID informado");
    }

    let produto_imagem = selecionarProduto.produto_imagem;

    if (req.file) {
      const { originalname, buffer, mimetype } = req.file;

      const imagem = await s3
        .upload({
          Bucket: process.env.BLACKBLAZE_BUCKET,
          Key: originalname,
          Body: buffer,
          ContentType: mimetype,
        })
        .promise();
      produto_imagem = imagem.Location;
    }
    const produto = {
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      produto_imagem,
    };

    const produtoAtualizado = await knex("produtos")
      .update(produto)
      .where({ id })
      .returning("*");

    if (!produtoAtualizado) {
      return res
        .status(400)
        .json("Não foi possível atualizar os dados do produto.");
    }

    return res.status(200).json(produtoAtualizado);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarProdutos,
  listarProdutos,
  detalharProduto,
  excluirProduto,
  editarDadosProduto,
};
