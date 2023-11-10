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

const verificar_cliente = async (id) => {
    const Verifica = await knex("clientes").where({ id }).first()
    return Verifica
}

const buscaPedido = async (cliente_id) => {
    const busca = await knex("pedidos").where("cliente_id", cliente_id).count()
    return busca[0].count
}

const apenasPedidos = async (cliente_id) => {
    if (!cliente_id) {
        const listando = await knex('pedidos')

        return listando
    }
    const listar = await knex("pedidos").where("cliente_id", cliente_id)
    return listar

}

const PedidoId = async (pedido) => {
    const listando = await knex("pedido_produto").where({ pedido_id: pedido.id })

    return listando
}


module.exports = {
    validarCamposPedido,
    verificar_cliente,
    buscaPedido,
    apenasPedidos,
    PedidoId
}