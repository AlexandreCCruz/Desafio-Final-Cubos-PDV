const knex = require('../conexao');

const {
    verificar_array_pedidos
} = require('../utils/funcoes_auxiliares');

const validarCamposPedido = async (req, res, next) => {
    const { cliente_id, pedido_produtos } = req.body

    if (!cliente_id) {
        return res.status(400).json({ mensagem: 'Campo (cliente_id) é obrigatório' })
    }

    try {

        const consultarCliente = await knex('clientes').where('id', cliente_id);

        if (!consultarCliente.length) {
            return res.status(404).json({ mensagem: 'Campo (cliente_id) não cadastrado' })
        }
        if (!pedido_produtos.length) {
            return res.status(400).json({ mensagem: 'É necessário selecionar pelo menos um produto para cadastrar o pedido' })
        }

        const validarCampoProdutoId = await verificar_array_pedidos(pedido_produtos);

        if (validarCampoProdutoId != 'campos validados') {
            return res.status(400).json({ mensagem: `Verificar o campo (${validarCampoProdutoId}) dos produtos selecionados` })
        }

        return next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = {
    validarCamposPedido
}