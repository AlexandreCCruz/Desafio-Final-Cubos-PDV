const knex = require('../conexao');
const transporter = require('../utils/mail')
require('dotenv').config();

const cadastrarPedido = async (req, res) => {
    const { nome, email } = req.usuario;
    const { pedido_produtos } = req.body;

    try {
        const produtosSelecionados = await Promise.all(pedido_produtos.map(async (pedido) => {
            const produto = await knex('produtos').where('id', pedido.produto_id).select('id', 'quantidade_estoque')
            return produto
        }))
        for (i = 0; i < produtosSelecionados.length; i++) {
            for (produto of pedido_produtos) {
                if (produtosSelecionados[i][0].id == produto.produto_id) {
                    const atualizarProduto = await knex('produtos').where('id', produtosSelecionados[i][0].id).update(
                        'quantidade_estoque', produtosSelecionados[i][0].quantidade_estoque - produto.quantidade_produto)
                    break
                }
            }
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
const listarpedidos = async (req, res) => {
    const { cliente_id } = req.body
    let resultado = []
    try {

        if (cliente_id) {

            const VereficarExistencia = await Knex("clientes").where({ id: cliente_id }).first()

            if (!VereficarExistencia) {
                return res.status(404).json({ mensagem: "o Cliente não foi encontrado." })
            }

            const buscarPedido = await knex("pedidos").where("cliente_id", cliente_id).count()

            if (buscarPedido === 0) {
                return res.status(404).json({ mensagem: "Não tem pedidos cadastrados para este cliente." })
            }
            return buscarPedido[0].count

        }

        const pedidos = await knex("pedidos");

        for (const pedido of pedidos) {
            const {
                id,
                valor_total,
                observacao,
                cliente_id,
            } = pedido;

            const pedidoId = await knex("pedido_produtos").where({ pedido_id: pedido.id })

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
        return res.status(500).json({ mensagem: `Erro interno do servidor` });
    }
}

module.exports = {
    cadastrarPedido,
    listarpedidos
}