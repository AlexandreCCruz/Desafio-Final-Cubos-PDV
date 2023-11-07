const knex = require('../conexao');

const verificar_array_pedidos = async (pedido_produtos) => {
    const consultarProdutoId = await Promise.all(pedido_produtos.map(async (pedido) => {
        const verificarProdutoId = await knex('produtos').where('id', pedido.produto_id);
        return verificarProdutoId.length > 0;
    }));

    const validarProdutoId = consultarProdutoId.every((resultado) => {
        return resultado;
    })

    if (!validarProdutoId) {
        return 'produto_id';
    }

    const consultarQuantidadeProduto = await Promise.all(pedido_produtos.map(async (pedido) => {
        const verificarQuantidadeProduto = await knex('produtos').select('quantidade_estoque').where('id', pedido.produto_id);
        return pedido.quantidade_produto < verificarQuantidadeProduto[0].quantidade_estoque
    }))

    const validarQuantidadeProduto = consultarQuantidadeProduto.every((resultado) => {
        return resultado
    })

    if (!validarQuantidadeProduto) {
        return 'quantidade_produto'
    }

    return 'campos validados'
}

module.exports = {
    verificar_array_pedidos
};