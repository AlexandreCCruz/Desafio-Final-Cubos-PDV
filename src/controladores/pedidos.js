const knex = require('../conexao');
const { verificar_cliente, bucaPedido, PedidoId, apenasPedidos } = require('../intermediarios/pedidos');
const transporter = require('../utils/mail')
require('dotenv').config();

const cadastrarPedido = async (req, res) => {
    const { nome, email } = req.usuario;
    const { cliente_id, observacao, pedido_produtos } = req.body;

    try {

        const produtosSelecionados = await Promise.all(pedido_produtos.map(async (pedido) => {
            const produto = await knex('produtos').where('id', pedido.produto_id).select('id', 'quantidade_estoque', 'valor')
            return produto
        }));

        let valorTotalPedido = 0;
        for (i = 0; i < produtosSelecionados.length; i++) {
            for (produto of pedido_produtos) {
                if (produtosSelecionados[i][0].id == produto.produto_id) {
                    const atualizarProduto = await knex('produtos')
                        .where('id', produtosSelecionados[i][0].id)
                        .update('quantidade_estoque', produtosSelecionados[i][0].quantidade_estoque - produto.quantidade_produto)
                    valorTotalPedido = valorTotalPedido + (produtosSelecionados[i][0].valor * produto.quantidade_produto)
                    break
                }
            }
        }

        const registrarPedido = await knex('pedidos')
            .insert({
                cliente_id,
                observacao,
                valor_total: valorTotalPedido
            }).returning('id')

        for (pedido of pedido_produtos) {
            const valor_produto = await knex('produtos').select('valor').where('id', pedido.produto_id)

            const registrarPedido_Produto = await knex('pedido_produto').insert({
                pedido_id: registrarPedido[0].id,
                produto_id: pedido.produto_id,
                quantidade_produto: pedido.quantidade_produto,
                valor_produto: valor_produto[0].valor
            }).returning('*')
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }

    const send = transporter.sendMail({
        from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
        to: `${nome} <${email}>`,
        subject: 'Verificação de Integração',
        text: 'Integração verificada com sucesso!'
    })

    return res.status(200).json({
        mensagem: `
    Pedido registrado com sucesso!
    Você receberá um e-mail de confirmação do pedido.
    ` })
}
const listarPedidos = async (req, res) => {
    const { cliente_id } = req.body

    try {
        const resultado = []

        if (cliente_id) {

            const VereficarExistencia = await verificar_cliente(cliente_id)

            if (!VereficarExistencia) {
                return res.status(404).json({ mensagem: "o Cliente não foi encontrado." })
            }

            const buscarPedido = await bucaPedido(cliente_id)


            if (buscarPedido == 0) {
                return res.status(404).json({ mensagem: "Não tem pedidos cadastrados para este cliente." })
            }

        }

        const pedidos = await apenasPedidos(cliente_id)


        for (const pedido of pedidos) {
            const {
                id,
                valor_total,
                observacao,
                cliente_id,
            } = pedido;

            const pedidoId = await PedidoId(pedido)

            const pedidoFormatado = {
                pedido: {
                    id,
                    valor_total,
                    observacao,
                    cliente_id
                },
                pedido_produtos: pedidoId.map(pedido_item => ({
                    id: pedido_item.id,
                    quantidade_produto: pedido_item.quantidade_produto,
                    valor_produto: pedido_item.valor_produto,
                    pedido_id: pedido_item.pedido_id,
                    produto_id: pedido_item.produto_id,
                }))
            };

            resultado.push(pedidoFormatado);
        }

        return res.json(resultado);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: `Erro interno do servidor` });
    }
}

module.exports = {
    cadastrarPedido,
    listarPedidos
}