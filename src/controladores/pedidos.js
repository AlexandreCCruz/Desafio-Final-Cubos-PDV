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

module.exports = {
    cadastrarPedido
}